import { useState } from 'react'
import Person from "./components/Person"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: 600000000
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

    console.log(numbers)
    console.log("está?", isNumberAlreadyUsed)
    if(isNameAlreadyUsed){
      alert(`The name ${newName} is already added to phonebook`)
    } else if(isNumberAlreadyUsed){
      alert(`The number ${newNumber} is already added to phonebook`)  
    } else{
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>        
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      {persons.map((person, i) =>
                <Person key={i} person={person}/>
             )}
    </div>
  )
}

export default App