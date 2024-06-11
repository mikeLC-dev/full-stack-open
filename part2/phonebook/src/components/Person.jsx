import React from 'react'



const Person = ({person,deletePerson}) =>{
        return(
        <div>
          <p>{person.name} {person.number}</p>
          <form onSubmit={deletePerson}>
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </form>       
        </div>)
  
}

export default Person 