const mongoose = require('mongoose')
const password = process.argv[2]
const url =
    `mongodb+srv://fullstack:${password}@cluster0.wctwxl0.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5){
  const inputName = process.argv[3]
  const inputNumber = process.argv[4]

  const person = new Person({
    name: inputName,
    number: inputNumber
  })

  person.save().then( () => {
    console.log(`added ${inputName} number ${inputNumber} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3){
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
}