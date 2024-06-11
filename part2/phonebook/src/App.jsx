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
    /*
      axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      }).catch(error => {
        console.log('error al agregar al servidor')
      })*/
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

    
    if(isNameAlreadyUsed){
      alert(`The name ${newName} is already added to phonebook`)
    } else if(isNumberAlreadyUsed){
      alert(`The number ${newNumber} is already added to phonebook`)  
    } else{

      /*
              axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          console.log('error al agregar al servidor')
        })

        */
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
        <Filter filter={newFilter} onChangeFilter={handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm addPerson={addPerson} name={newName} onChangeName={handleNameChange} number={newNumber} onChangeNumber={handleNumberChange}/>   
      <h2>Numbers</h2>
        <Persons persons={persons} show={showAll} filter={newFilter}/>
    </div>
  )
}

export default App