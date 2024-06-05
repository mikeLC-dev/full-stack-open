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
      <Stadistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

const StadisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr><td>{props.text} {props.value} % </td></tr>
    )
  }

  return (
    <tr><td>{props.text} {props.value}</td></tr>
  )
}



const Stadistics = (props)=>{
  
  const total = props.good+props.bad+props.neutral
  const average = ((props.good * 1 + props.bad * -1) / total).toFixed(2)
  const positive = (props.good / total).toFixed(2)

  if(total === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else{
    return (
      <div>
        <table>
          <tbody>
        <StadisticLine text="good" value={props.good}/>
        <StadisticLine text="neutral" value={props.neutral}/>
        <StadisticLine text="bad" value={props.bad}/>
        <StadisticLine text="total" value={total}/>
        <StadisticLine text="average" value={average}/>
        <StadisticLine text="positive" value={positive}/>
        </tbody>
        </table>
      </div>

    )
  }

  
}




const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.option}
  </button>
)

export default App