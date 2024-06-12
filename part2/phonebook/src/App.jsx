import { useState, useEffect } from 'react'
import Person from "./components/Person"
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import axios from 'axios'
import personsService from './services/persons'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newNotification, setNotification] = useState(null)

  useEffect(() => {
    personsService.
      getAll().
      then(initialPersons =>{
        setPersons(initialPersons)
      }).catch(error => {
        console.log('error al agregar al servidor')
      })
  }, [])
  


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber   
    }
     
    const names = persons.map((person)=>person.name)
    const isNameAlreadyUsed = names.includes(newName)
    const numbers = persons.map((person)=>parseInt(person.number))
    const isNumberAlreadyUsed = numbers.includes(parseInt(newNumber))

    
    if(isNameAlreadyUsed || isNumberAlreadyUsed){
      if(window.confirm(`The name ${newName} is already added to phonebook, do you want to Update?`)){
        const updatePerson = persons.filter(person=>(person.name === personObject.name) || (person.number === personObject.number))
        personsService
          .update(updatePerson[0].id,personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== updatePerson[0].id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            
            
          }).catch(error => {
            console.log('error al actualizar los datos de la persona')
            setNotification(`ERROR: ${newName} has already been removed from server`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else{

      personsService
        .create(personObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
        }).catch(error => {
          console.log('error al agregar al servidor')
        })
    }
    
    
  }

  const deletePerson = (id) =>{
    
    const personObject = persons.find((person)=>person.id === id)
    if (window.confirm(`Delete ${personObject.name} ?`)) {
      personsService.deletePerson(personObject.id)
        .then(returnedPerson =>{
          setPersons(persons.filter((person)=>person.id != personObject.id))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setNotification(`ERROR: That person has already been removed from server`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          console.log('error al agregar al servidor')})
    }
  }
  

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event)=>{
    console.log(event.target.value)
    setNewFilter(event.target.value)
    setShowAll(false)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={newNotification}/>
        <Filter filter={newFilter} onChangeFilter={handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm addPerson={addPerson} name={newName} onChangeName={handleNameChange} number={newNumber} onChangeNumber={handleNumberChange}/>   
      <h2>Numbers</h2>
        <Persons persons={persons} show={showAll} filter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App