import React from 'react'
import Content from "./Content"
import Header from "./Header"
import Total from "./Total"



const Course = ({courses}) =>{
    //console.log(courses) 
    
    
        
        return(
        <div>
          {courses.map((course) => 
            <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total total={course.parts}/>
            </div>
         )} 
         
        </div>)

    
}



export default Course 