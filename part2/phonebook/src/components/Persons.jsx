import React from 'react'
import Person from './Person/'

const Persons = ({persons,show,filter,deletePerson}) =>{
    return(
    <div>
        {persons.map((person, i) => {
        if(show || person.name.includes(filter)){
          return <Person key={i} person={person} deletePerson={deletePerson} />
        }   
      })}
    </div>)

}




export default Persons