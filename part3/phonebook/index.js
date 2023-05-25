const express = require('express')
const app = express()
const morgan = require('morgan')

const cors = require('cors')
app.use(cors())

morgan.token('person', (req, res) => { 
    if (req.method === "POST"){
        return JSON.stringify(req.body, ['name', 'number'])
    } else {
        return " "
    }
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
// app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('build'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons" , (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    const qt = persons.length
    const date = new Date()
    response.send(
        `<div>
            Phonebook has info for ${qt} people </br>
            ${date}
        </div>`
    )
})

app.get("/api/persons/:id" , (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id" , (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const listID = persons.map( p => p.id)
    while(true){
        const id = Math.floor(Math.random()*100)
        if (!listID.includes(id)){
            return id
        }
    }
}

app.post("/api/persons", (request, response) => {
    const person = request.body
    // console.log(person)
    const listPerson = persons.map( p => p.name)
    if(!person.name) {
        return response.status(400).json({
            error:'name is missing'
        })
    }
    if(!person.number) {
        return response.status(400).json({
            error:'number is missing'
        })
    }
    if(listPerson.includes(person.name)) {
        return response.status(400).json({
            error:'name must be unique'
        })
    }
    person.id = generateId()
    persons = persons.concat(person)

    response.json(person)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})

