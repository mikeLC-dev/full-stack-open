import React from 'react'
import Person from './Person/'

const Persons = ({persons,show,filter}) =>{
    return(
    <div>
        {persons.map((person, i) => {
        if(show || person.name.includes(filter)){
          return <Person key={i} person={person} />
        }   
      })}
    </div>)

}




export default Persons