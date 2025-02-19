import { useState } from 'react'



const FeedbackButton = ({text,onClick}) => <button onClick={onClick}>{text}</button>

const Display = ({good,neutral,bad}) => {
  return (
    <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h2>Give feedback</h2>
      <FeedbackButton text={"good"} onClick={() => setGood(good + 1)}></FeedbackButton>
      <FeedbackButton text={"neutral"} onClick={() => setNeutral(neutral + 1)}></FeedbackButton>
      <FeedbackButton text={"bad"} onClick={() => setBad(bad + 1)}></FeedbackButton>
      <h2>Statistics</h2>
      <Display good={good} neutral={neutral} bad={bad}></Display>
    </div>
  )
}

export default App