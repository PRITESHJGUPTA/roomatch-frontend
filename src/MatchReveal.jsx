// MatchReveal.jsx

import React, { useEffect, useState } from 'react';
import API from './api';

const MatchReveal = ({ roomCode, userId }) => {
  const [countdown, setCountdown] = useState(5);
  const [matchName, setMatchName] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          fetchMatch();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchMatch = async () => {
    try {
      const res = await API.get(`/rooms/${roomCode}/match/${userId}`);
      setMatchName(res.data.matchName);

      // Clear data on backend after match reveal (optional endpoint)
      await API.delete(`/rooms/${roomCode}/match/${userId}`);

      // Save to local storage for refresh persistence
      localStorage.setItem(`match-${roomCode}-${userId}`, res.data.matchName);
    } catch (err) {
      console.error('Error fetching match:', err);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem(`match-${roomCode}-${userId}`);
    if (cached) setMatchName(cached);
  }, [roomCode, userId]);

  if (matchName === null) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2 style={{ fontSize: '2rem' }}>Get Ready...</h2>
        <div
          style={{
            fontSize: '5rem',
            background: '#222',
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '10px',
            display: 'inline-block',
            marginTop: '20px'
          }}
        >
          {countdown}
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2 style={{ fontSize: '2rem' }}>Your Match Is:</h2>
      <h1
        style={{
          fontSize: '4rem',
          background: 'linear-gradient(90deg, #f43f5e, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginTop: '20px'
        }}
      >
        {matchName}
      </h1>
    </div>
  );
};

export default MatchReveal;