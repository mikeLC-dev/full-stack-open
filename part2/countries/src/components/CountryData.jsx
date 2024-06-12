import React from 'react'
import Language from './Language'
import { useState, useEffect } from 'react'
import axios from 'axios'



const CountryData = ({country}) =>{
        const languagesArray = Object.values(country.languages)
        const flags = Object.values(country.flags)
        const api_key = import.meta.env.VITE_SOME_KEY
        const apiURL = `https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=${api_key}&lat=${country.latlng[0]}&lon=${country.latlng[0]}&format=json`
        
        const [weather, setWeather] = useState([])
        
        useEffect(() => {
          axios.get(apiURL)
          .then(response => {
            const apiResponse = response.data;
            console.log("RESPUESTA API:",apiResponse)
            setWeather([apiResponse])
          }).catch(error => {
            console.log(error);
          })
        }, [])
        
        if(weather.length>0){
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
              <h2>Weather in {country.name.official}</h2>
              <p>Temperature: {weather[0]["data_day"]["temperature_instant"][0]}</p>
              <p>Wind: {weather[0]["data_day"]["windspeed_mean"][0]}</p>
            </div>)
        }
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