import Content from "./Content"
import Header from "./Header"
import Total from "./Total"
import React from 'react'


const Course = ({course}) =>{
    //console.log(course.parts)
    return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total total={course.parts}/>
    </div>)
}



export default Course 