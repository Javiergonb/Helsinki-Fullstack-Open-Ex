import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import personService from './services/person'
import Persons from './components/Persons'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="error">{message}</div>
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input onChange={onChange} value={value} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [addMessage, setAddMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const peopleToShow = setSearch === ''
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(search))


  const handleNameChange = (event) => setNewName(event.target.value)

  const handlePhoneChange = (event) => setNewPhone(event.target.value)

  const handleSearchChange = (event) => setSearch(event.target.value)

  const handleDeletePerson = id => {
    const person = persons.find(n => n.id === id)

    if (!window.confirm(`Delete ${person} from phone book?`)) {
      return
    }

    personService.deletePerson(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
      })
      .catch(error => {
        alert(`Couldnt delete ${person} from phone book because ${error}`)
      })

  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find((person) => Object.values(person).includes(newName));

    if (!existingPerson) {
      const newPerson = {
        name: newName,
        number: newPhone
      }

      personService.create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewPhone('')
          setAddMessage(
            `Added ${person.name}`
          )
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        })
    }

    if (!window.confirm(`${existingPerson.name} is already added to phonebook, replace old number with new one?`)) {
      return
    }

    const updatedPerson = { ...existingPerson, number: newPhone }

    personService.update(existingPerson.id, updatedPerson)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
      })


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage}/>
      <Filter value={search} onChange={handleSearchChange} />
      <h3>Add a new person</h3>
      <PersonForm
        onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App