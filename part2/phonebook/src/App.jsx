import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phoneNumber: "040-1234567"
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) =>  setNewName(event.target.value)
  
  const handlePhoneChange = (event) => setNewPhone(event.target.value)

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
      phoneNumber: newPhone
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <div>debug: {newPhone}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handlePhoneChange} value={newPhone}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>
          <b>{person.name} </b> 
          <b>{person.phoneNumber}</b>
        </div>)}
    </div>
  )
}

export default App