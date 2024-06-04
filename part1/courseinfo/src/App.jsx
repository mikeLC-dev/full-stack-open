const App = () => {

 
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  /*
const course = 'Half Stack application development'*/
const part1 = {
  name: 'Fundamentals of React',
  exercises: 10
}
const part2 = {
  name: 'Using props to pass data',
  exercises: 7
}
const part3 = {
  name: 'State of a component',
  exercises: 14
}
  return (
    <div>
      <Header course={course.name} />
      <Content name1={course.parts[0].name} exe1={course.parts[0].exercises} name2={course.parts[1].name} exe2={course.parts[1].exercises} name3={course.parts[2].name} exe3={course.parts[2].exercises}/>
      <Result exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  
  return (
    <div>
      <Part name={props.name1} exercises={props.exe1}/>
      <Part name={props.name2} exercises={props.exe2}/>
      <Part name={props.name3} exercises={props.exe3}/>
    </div>
  )
}

const Part = (props) =>{
  return(
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Result = (props) => {
  
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}

export default App