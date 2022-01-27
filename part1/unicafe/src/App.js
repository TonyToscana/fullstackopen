import React, { useState } from 'react';

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
        <>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {total}</p>
          <p>average {zeroIfNaN(average)}</p>
          <p>positive {zeroIfNaN(positive) * 100} %</p>
        </>
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
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics {...statisticsProps} />
    </div>
  );
};

export default App;
