import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      //Button1
      //Button2
      //Button3
      <h1>stadistics</h1>
      <p>stadistics1</p>
      <p>stadistics2</p>
      <p>stadistics3</p>
    </div>
  )
}

export default App