import { useState } from 'react'
import Statistics from './Statistics'


function App() {
  const [good , setgood] = useState(0)
  const [neutral ,setneutral] =useState(0)
  const [bad , setbad] = useState(0)
  

  const Total = good + neutral + bad
  const average = Total/3
  const positivePercentage = (good / Total) * 100 || 0;

  return (
    <>
      <h1>Give Feedback</h1>
      <button onClick={() => { setgood(good + 1) }}>Good</button>
      <button onClick={() => { setneutral(neutral + 1) }}>Neutral</button>
      <button onClick={() => { setbad(bad + 1) }}>Bad</button>
      <h1>Statistics</h1>
      {Total === 0 ? (
        <h2>No Feedback Given</h2>
      ) : (
        <Statistics 
          good={good} 
          neutral={neutral} 
          bad={bad} 
          average={average.toFixed(2)} 
          positivePercentage={positivePercentage.toFixed(1)} 
        />
      )}
    </>
  )
}

export default App
