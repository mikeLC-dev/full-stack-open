import { useState } from 'react'
import Person from "./components/Person"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Arto Lovelace', number: '040-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

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

  const handleFilterChange = (event)=>{
    console.log(event.target.value)
    setNewFilter(event.target.value)
    setShowAll(false)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
        </div>
      </form>
      <h2>add a new</h2>
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
      
      {persons.map((person, i) => {
        if(showAll || person.name.includes(newFilter)){
          return <Person key={i} person={person} />
        }   
      })}
    </div>
  )
}

export default App