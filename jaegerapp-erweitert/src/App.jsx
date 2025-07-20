import React, { useEffect, useState } from "react";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [mode, setMode] = useState("menu"); // "learn" or "exam"

  useEffect(() => {
    fetch("/data/questions.json")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const startLearn = () => {
    setMode("learn");
    setIndex(0);
    setAnswered([]);
  };

  const startExam = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, 100);
    setQuestions(shuffled);
    setIndex(0);
    setMode("exam");
  };

  if (!questions.length) return <div>Lade Fragen...</div>;

  if (mode === "menu") {
    return (
      <div style={{ padding: 20 }}>
        <h1>Jagd Lern-App</h1>
        <button onClick={startLearn}>Lernmodus starten</button>
        <button onClick={startExam}>Prüfungsmodus starten</button>
      </div>
    );
  }

  const q = questions[index];
  const next = () => setIndex((i) => i + 1);
  const isExam = mode === "exam";

  return (
    <div style={{ padding: 20 }}>
      <h2>{isExam ? "Prüfungsfrage" : "Lernfrage"} {index + 1}</h2>
      <p><strong>{q.group}:</strong> {q.text}</p>
      <ul>
        {q.answers.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
      {index < questions.length - 1 ? (
        <button onClick={next}>Weiter</button>
      ) : (
        <p>Ende erreicht.</p>
      )}
    </div>
  );
}
