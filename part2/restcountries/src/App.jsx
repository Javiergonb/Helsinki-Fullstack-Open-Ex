import { useEffect, useState } from "react";
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const Input = ({ onChange, value, text }) => {
  return (
    <div>
      {text} <input onChange={onChange} value={value} />
    </div>
  )
}

const FullCountryInfo = ({country}) => {
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`) 
    .then(response => {
      const initialWeather = response
      setWeatherInfo(initialWeather)
    })
  },[]) 

  return (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      {Object.entries(country.languages).map(([key, value]) => {
        return <li key={key}><b>{value}</b></li>
      })}
      <div>
        <img style={{width : "100px" , height : "70px", marginTop : "50px"}} src={country.flags.svg} alt={country.flags.alt} />
      </div>
      {weatherInfo?(
        <>
          <h2>Weather in {country.name.common}</h2>
          <p>Temperature {weatherInfo.data.main.temp - 273.15} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weatherInfo.data.weather[0].icon}@2x.png`} alt="" />
          <p>Wind {weatherInfo.data.wind.speed} m/s</p>
        </>
      ): null}
    </div>
  )
}


const CountryListItem = ({ country }) => {
  const [showInfo, setShowInfo] = useState(false)

  const handleShow = () => {
    setShowInfo(!showInfo)
  }

  return (
    <>
      <div key={country.name.common}>{country.name.common}</div>
      <button onClick={handleShow}>
        {showInfo ? "Hide" : "Show"}
      </button>
      {showInfo && <FullCountryInfo country={country} />}
    </>
  )
}


const Countries = ({ countries }) => {
  if (countries.length === 0) {
    return null
  }
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countries.length > 1) {
    return (
      <>
        {countries.map(country => {
          return <CountryListItem key={country.name.common} country={country}/>
        })}
      </>
    )
  }
  else if (countries.length === 1) {
    return (
      <>
        <FullCountryInfo country={countries[0]}/>
      </>
    )
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        const allCountries = response.data
        setCountries(allCountries)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  return (
    <div>
      <Input onChange={handleSearch} value={search} text={"find countries: "}></Input>
      <Countries countries={filteredCountries} />

    </div>

  )
}

export default App