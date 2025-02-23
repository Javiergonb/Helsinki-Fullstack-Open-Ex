const Persons = ({ peopleToShow, handleDeletePerson }) => {
    return (
        peopleToShow.map(person =>
            <div key={person.name}>
                {person.name}
                <b> {person.number} </b>
                <button onClick={() => handleDeletePerson(person.id)}>delete</button>
            </div>)
    )
}

export default Persons