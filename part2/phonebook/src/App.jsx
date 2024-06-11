import { useState, useEffect } from 'react'
import Person from "./components/Person"
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

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
          }).catch(error => {
            console.log('error al actualizar los datos de la persona')
          })
      }
    } /*else if(isNumberAlreadyUsed){
      alert(`The number ${newNumber} is already added to phonebook`)  
    } */else{

      personsService
        .create(personObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
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
          //setPersons(persons.map(person => person.id !== personObject.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
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
  /*
  const handleDeletePerson = (event)=>{
    console.log(event.target.value)
    setPersons(event.target.value)
  }
  */


  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={newFilter} onChangeFilter={handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm addPerson={addPerson} name={newName} onChangeName={handleNameChange} number={newNumber} onChangeNumber={handleNumberChange}/>   
      <h2>Numbers</h2>
        <Persons persons={persons} show={showAll} filter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App