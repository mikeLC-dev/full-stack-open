import Content from "./Content"
import Header from "./Header"
import React from 'react'


const Course = ({course}) =>{
    //console.log(course.parts)
    return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      
    </div>)
}


/*
const Result = (props) => {
  
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}
*/
export default Course 