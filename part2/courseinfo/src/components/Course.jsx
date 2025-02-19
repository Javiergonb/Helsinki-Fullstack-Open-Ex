const Header = ({title}) => <h2>{title}</h2>

const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key = {part.id} part = {part}></Part>)}
  </div>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({total}) => <p><b>Number of exercises {total}</b></p>

const Course = ({course}) =>{
  return (
    <>
      <Header title={course.name}/>
      <Content parts = {course.parts}/>
      <Total total={
          course.parts.reduce((sum , part) => sum + part.exercises, 0)
      }/>
    </>
  )
}

export default Course