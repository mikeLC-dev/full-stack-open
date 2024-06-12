import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import Countries from './components/Countries'
import Filter from './components/Filter'
import countriesService from './services/countries'




const App = () => {
  
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')


  useEffect(() => {
    countriesService.
      getAll().
      then(initialCountries =>{
        setCountries(initialCountries)
      }).catch(error => {
        console.log('error al listar los paises')
      })
  }, [])

  const handleFilterChange = (event)=>{
    console.log(event.target.value)
    setNewFilter(event.target.value)
    
  }

  return (
    <div>
      <Filter filter={newFilter} onChangeFilter={handleFilterChange}/>
      <Countries countries={countries} filter={newFilter}/>
    </div>
  )
}

export default App
