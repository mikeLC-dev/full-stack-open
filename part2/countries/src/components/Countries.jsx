import React from 'react'
import Country from './Country'
import CountryData from './CountryData'

const Countries = ({countries,filter}) =>{

    
    const countriesFiltered = countries.filter(country =>country.name.official.includes(filter))

    console.log(countriesFiltered)

    if(countriesFiltered.length === 1){
        
        return <CountryData country={countriesFiltered[0]}/>
    } else if(countriesFiltered.length >= 10){
        return(
        <div>
            <p>Too many matches, specify another filter</p>
        </div>)
    } else{
        return(
            <div>
                {countries.map((country, i) => {
                if(country.name.official.includes(filter)){
                    return <Country key={i} country={country} />
                }    
              })}
            </div>)
    }  
    
}

export default Countries