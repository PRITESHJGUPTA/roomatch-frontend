// QuestionForm.jsx (Styled with CSS, updated with gender preference handling - no changes required here)

import React, { useEffect, useState } from 'react';
import API from './api';
import MatchReveal from './MatchReveal';

const QuestionForm = ({ roomCode, userId, name }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [readyToReveal, setReadyToReveal] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get(`/rooms/${roomCode}/questions`);
        setQuestions(res.data.questions);
      } catch (err) {
        console.error(err);
        alert('Failed to load questions');
      }
    };
    fetchQuestions();
  }, [roomCode]);

  useEffect(() => {
    if (!submitted) return;
    const poll = setInterval(async () => {
      try {
        const res = await API.get(`/rooms/${roomCode}/status`);
        if (res.data.state === 'countdown') {
          clearInterval(poll);
          setReadyToReveal(true);
        }
      } catch (err) {
        console.error(err);
      }
    }, 2000);
    return () => clearInterval(poll);
  }, [submitted, roomCode]);

  const handleAnswer = async (value) => {
    const currentQ = questions[currentIndex];
    setAnswers(prev => ({ ...prev, [currentQ.id]: value }));

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      try {
        await API.post(`/rooms/${roomCode}/answers`, {
          userId,
          answers: { ...answers, [currentQ.id]: value }
        });
        setSubmitted(true);
      } catch (err) {
        console.error(err);
        alert('Failed to submit answers');
      }
    }
  };

  if (readyToReveal) {
    return <MatchReveal roomCode={roomCode} userId={userId} />;
  }

  if (submitted) return <p className="center">Waiting for others to complete…</p>;
  if (questions.length === 0) return <p className="center">Loading questions...</p>;

  const currentQ = questions[currentIndex];

  return (
    <div className="container card center">
      <h2>{currentQ.text}</h2>
      <div>
        {[...Array(10)].map((_, i) => (
          <button
            key={i + 1}
            className="option"
            onClick={() => handleAnswer(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionForm;
