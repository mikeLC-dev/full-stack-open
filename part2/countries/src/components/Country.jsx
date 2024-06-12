import React from 'react'
import CountryData from './CountryData'
import Countries from './Countries'



const Country = ({country,setCountries}) =>{
        
        return(
        <div>
        <p>{country.name.official}</p>
        <button onClick={() => setCountries([country])}>show</button>      
        </div>)
  
}

export default Country 