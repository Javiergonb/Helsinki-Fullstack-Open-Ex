import { useEffect, useState } from "react";
import axios from 'axios'


const Input = ({ onChange, value, text }) => {
  return (
    <div>
      {text} <input onChange={onChange} value={value} />
    </div>
  )
}


const Countries = ({ countries }) => {
  if (countries == []) {
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
          return <div key={country.name.common}>{country.name.common}</div>
        })}
      </>
    )
  }
  else if (countries.length === 1) {
    const country = countries[0]
    console.log(country)
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
      </div>
    )
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search))

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