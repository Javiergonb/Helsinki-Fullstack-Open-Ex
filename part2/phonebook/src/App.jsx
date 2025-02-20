import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import personServie from './services/person'

const Persons = ({peopleToShow}) => {
  return(
    peopleToShow.map(person => 
      <div key={person.name}>
        {person.name} 
        <b> {person.number}</b>
      </div>)
  )
}

const Filter = ({value,onChange}) =>{
  return (
    <div>
      filter shown with <input onChange={onChange} value={value}/>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  useEffect(()=>{
    personServie.getAll()
    .then(initialPersons =>{
      setPersons(initialPersons)
    })
  },[])

  const peopleToShow = setSearch === ''
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(search))
     

  const handleNameChange = (event) =>  setNewName(event.target.value)
  
  const handlePhoneChange = (event) => setNewPhone(event.target.value)

  const handleSearchChange = (event) =>setSearch(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.some((person) => Object.values(person).includes(newName))
    if (exists){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    const newPerson = {
      name: newName,
      number: newPhone
    }

    personServie.create(newPerson)
    .then(person => {
      setPersons(persons.concat(person))
      setNewName('')
      setNewPhone('')
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange}/>
      <h3>Add a new person</h3>
      <PersonForm 
        onSubmit={addPerson} 
        handleNameChange={handleNameChange}
        handlePhoneChange = {handlePhoneChange}
        newName = {newName}
        newPhone = {newPhone}
      />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow}/>
    </div>
  )
}

export default App