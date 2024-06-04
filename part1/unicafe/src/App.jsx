import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setOption = (value, option) =>{
    if(option === "good"){
      console.log("good increments")
      console.log(value)
      setGood(value+1)
      return
    } else if(option === "neutral"){
      console.log("neutral increments")
      console.log(value)
      setNeutral(value+1)
      return
    } else if(option === "bad"){
      console.log("bad increments")
      console.log(value)
      setBad(value+1)
      return
    }
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>setOption(good,"good")} option="good"/>
      <Button handleClick={()=>setOption(neutral,"neutral")} option="neutral"/>
      <Button handleClick={()=>setOption(bad,"bad")} option="bad"/>
      <h1>stadistics</h1>
      <Display option="good" value={good} />
      <Display option="neutral" value={neutral} />
      <Display option="bad" value={bad} />

    </div>
  )
}

const Display = (props) =>(

  <p>{props.option} {props.value}</p>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.option}
  </button>
)

export default App