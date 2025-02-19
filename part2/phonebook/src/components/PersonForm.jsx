const Input = ({onChange,value,text}) => {
    return (
      <div>
        {text} <input onChange={onChange} value={value} />
      </div>
    )
  }
  
const PersonForm = ({onSubmit, ...props}) => {
  return (
    <form onSubmit={onSubmit}>
      <Input onChange={props.handleNameChange} value={props.newName} text='new:' />
      <Input onChange={props.handlePhoneChange} value={props.newPhone} text = 'number:'/>
      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm