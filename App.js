// App.js
import React, { useState, useEffect } from "react";

function App() {
  const [sentiment, setSentiment] = useState(null);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const response = await fetch("http://localhost:3001/sentiment");
        const data = await response.json();
        setSentiment(data.sentiment);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSentiment();
  }, []);

  return (
    <div>
      <h1>Sentiment Analysis</h1>
      {sentiment && (
        <div>
          <h2>Analysis Result</h2>
          <p>Score: {sentiment.score}</p>
          <p>Comparative: {sentiment.comparative}</p>
          <p>Positive Words: {sentiment.positive.join(", ")}</p>
          <p>Negative Words: {sentiment.negative.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
