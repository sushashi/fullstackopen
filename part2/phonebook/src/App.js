import { useState, useEffect } from 'react'
import phoneService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState(persons)
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterBox, setFilterBox] = useState("")
  const [message, setMessage] = useState(null)
  
  useEffect( ()=> {
    phoneService.getAll().then(data => {
      setPersons(data)
      setPersonsFiltered(data)
    })
  },[])

  const displayNotification = (message) => {
    setMessage(message)
    setTimeout( ()=>{
      setMessage(null)
    }, 5000)
  }
  
  const handleDelete = (id) =>{
    const p = persons.filter( (n) => n.id === id)
    console.log("name ", p[0].name)
    const delBool = window.confirm(`Delete ${p[0].name} ?`)
    console.log("clicked on delete for id",id , "confirmed? " , delBool)

    if (delBool){
      phoneService.delEntry(id).then(
        setPersons(persons.filter( n => n.id !== id)),
        setPersonsFiltered(persons.filter( n => n.id !== id)),
        displayNotification(`${p[0].name} has been deleted`)
      )
      .catch(error => {
        console.log(error)
        displayNotification(`Information of ${p[0].name} has already been removed from server`)
      })
    }
  }

  const handleFilterBox = (event) => { 
    event.preventDefault()
    setFilterBox(event.target.value)
    const filtered = persons.filter( (p) => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setPersonsFiltered(filtered)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault()
    const testExist = () => {
      return(
        persons.some( p => p.name === newName)
      )
    }
    console.log("Exist?: ",testExist()) 

    if(testExist()){
      const replaceNbBool = (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      if (replaceNbBool){
        const pers = persons.find(p => p.name === newName)
        const updatedPerson = {...pers, number: newNumber}
        phoneService
          .updateEntry(pers.id, updatedPerson)
          .then(returnedData => {
            console.log("WHAT Response: ", returnedData)
            setPersons(persons.map( p => p.name !== newName ? p : returnedData) )
            setPersonsFiltered(persons.map( p => p.name !== newName ? p : returnedData) )
            
            displayNotification(`Number changed for ${pers.name}`)

            setNewName("")
            setNewNumber("")
            setFilterBox("")
          })
          .catch(error => {
            displayNotification(`Information of ${pers.name} has already been removed from server`)
          })
      }
    
    }else{
      const personObj ={
        name: newName,
        number: newNumber
      }

      phoneService.create(personObj).then(returnedData => {
        console.log(returnedData)
        setPersons(persons.concat(returnedData))
        setPersonsFiltered(persons.concat(returnedData))
      })
      displayNotification(`Added ${personObj.name}`)

      setFilterBox("")
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filterBox={filterBox} handleFilterBox={handleFilterBox}/>
      
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>
      <Persons persons ={personsFiltered} handleDelete={handleDelete} />
    </div>
  )
}
export default App