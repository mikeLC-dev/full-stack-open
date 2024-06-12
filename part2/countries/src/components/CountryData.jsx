import React from 'react'
import Language from './Language'



const CountryData = ({country}) =>{
        const languagesArray = Object.values(country.languages)
        const flags = Object.values(country.flags)
        
        return(
        <div>
          <h1>{country.name.official}</h1>
          <p>Capital: ${country.capital[0]}</p>    
          <p>Area: ${country.area}</p>
          <h2>languages:</h2>
            <ul>
              {languagesArray.map((lang,i) =>{
                
                return(<Language key={i} language={lang}/>)
              })}
            </ul>
          <img src={flags[0]}/>
        </div>)
  
}

export default CountryData