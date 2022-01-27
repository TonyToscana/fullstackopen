import React, { useState } from 'react';

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good / total;

  const zeroIfNaN = (value) => (isNaN(value) ? 0 : value);

  return (
    <>
      <h1>statistics</h1>
      {total <= 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={total} />
            <StatisticsLine text="average" value={zeroIfNaN(average)} />
            <StatisticsLine
              text="positive"
              value={zeroIfNaN(positive) * 100 + ' %'}
            />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const statisticsProps = {
    good,
    neutral,
    bad,
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      <Statistics {...statisticsProps} />
    </div>
  );
};

export default App;
