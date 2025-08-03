// App.jsx (with gender and preference added to join form)

import React, { useState } from 'react';
import API from './api';
import QuestionForm from './QuestionForm';

function App() {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [userId, setUserId] = useState('');
  const [joined, setJoined] = useState(false);
  const [roomSize, setRoomSize] = useState(2);
  const [gender, setGender] = useState('');
  const [lookingFor, setLookingFor] = useState('');

  const createRoom = async () => {
    if (roomSize % 2 !== 0) {
      alert('Room size must be an even number.');
      return;
    }

    try {
      const res = await API.post('/rooms', { size: roomSize });
      const code = res.data.roomCode;
      setRoomCode(code);
      alert(`Room created: ${code}`);
      await API.post(`/rooms/${code}/questions`);
    } catch (err) {
      console.error('Room creation failed:', err.response?.data || err.message);
      alert('Failed to create room');
    }
  };

  const joinRoom = async () => {
    if (!name || !roomCode || !gender || !lookingFor) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const res = await API.post(`/rooms/${roomCode}/join`, {
        name,
        gender,
        lookingFor
      });
      setUserId(res.data.userId);
      setJoined(true);
    } catch (err) {
      console.error(err);
      alert('Failed to join room');
    }
  };

  if (joined) {
    return (
      <div className="container card center">
        <h2>Welcome, {name}!</h2>
        <p>You’ve joined Room <strong>{roomCode}</strong></p>
        <QuestionForm roomCode={roomCode} userId={userId} name={name} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>RoomMatch</h1>

        <div>
          <h3>Create a Room</h3>
          <label>Room size (even number):</label>
          <input
            type="number"
            value={roomSize}
            min={2}
            step={2}
            onChange={(e) => setRoomSize(Number(e.target.value))}
          />
          <button onClick={createRoom}>Create Room</button>
        </div>

        <hr style={{ margin: '2rem 0' }} />

        <div>
          <h3>Join a Room</h3>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />

          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
          </select>

          <select value={lookingFor} onChange={(e) => setLookingFor(e.target.value)}>
            <option value="">Looking for</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Anyone</option>
          </select>

          <button onClick={joinRoom}>Join Room</button>
        </div>
      </div>
    </div>
  );
}

export default App;
