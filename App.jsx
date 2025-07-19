import React, { useEffect, useState } from "react";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  if (!questions.length) return <div>Lade Fragen...</div>;

  const q = questions[index];
  return (
    <div style={{ padding: 20 }}>
      <h2>Frage {q.id}</h2>
      <p>{q.text}</p>
      <ul>
        {q.answers.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
      <button onClick={() => setIndex((i) => (i + 1) % questions.length)}>
        Nächste Frage
      </button>
    </div>
  );
}
