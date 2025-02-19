import { useState } from 'react'



const Button = ({text,onClick}) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({text,value}) =>{
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return <div>No feedback given</div>
  }
  return (
    <table>
      <tbody>
        <StatisticsLine value={props.good} text={"good"}></StatisticsLine>
        <StatisticsLine value={props.neutral} text={"neutral"}></StatisticsLine>
        <StatisticsLine value={props.bad} text={"bad"}></StatisticsLine>
        <StatisticsLine value={props.total} text={"all"}></StatisticsLine>
        <StatisticsLine value={props.average} text={"average"}></StatisticsLine>
        <StatisticsLine value={props.positivePercent} text={"positive"}></StatisticsLine>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good * 1 + bad * -1) / (total? total: 1);
  const positivePercent = (good) / (total? total: 1);


  return (
    <div>
      <h2>Give feedback</h2>
      <Button text={"good"} onClick={() => setGood(good + 1)}></Button>
      <Button text={"neutral"} onClick={() => setNeutral(neutral + 1)}></Button>
      <Button text={"bad"} onClick={() => setBad(bad + 1)}></Button>
      <h2>Statistics</h2>
      
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        total={total} 
        average={average} 
        positivePercent={positivePercent}>
        </Statistics>
      
      
      
    </div>
  )
}

export default App