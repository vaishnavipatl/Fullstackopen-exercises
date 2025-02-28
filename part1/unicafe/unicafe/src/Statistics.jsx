import React from 'react'

function Statistics({good ,neutral, bad, average,positivePercentage}) {
   
  return (
    <div>
       <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>All</td>
            <td>{good + neutral + bad}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{positivePercentage}%</td>
          </tr>
        </tbody>
       </table>
    </div>
  )
}

export default Statistics
