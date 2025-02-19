import { use, useState } from 'react'



const FeedbackButton = ({text,onClick}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good,neutral,bad,total,average,positivePercent}) => {
  return (
    <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {average}</p>
        <p> positive {positivePercent}%</p>
    </>
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
      <FeedbackButton text={"good"} onClick={() => setGood(good + 1)}></FeedbackButton>
      <FeedbackButton text={"neutral"} onClick={() => setNeutral(neutral + 1)}></FeedbackButton>
      <FeedbackButton text={"bad"} onClick={() => setBad(bad + 1)}></FeedbackButton>
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