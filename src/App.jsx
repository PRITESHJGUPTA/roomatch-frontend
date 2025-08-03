import React, { useState } from 'react';
import API from './api';
import QuestionForm from './QuestionForm';

function App() {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [userId, setUserId] = useState('');
  const [joined, setJoined] = useState(false);
  const [roomSize, setRoomSize] = useState(2);

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
    if (!name || !roomCode) {
      alert('Please enter both name and room code');
      return;
    }

    try {
      const res = await API.post(`/rooms/${roomCode}/join`, { name });
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
          <button onClick={joinRoom}>Join Room</button>
        </div>
      </div>
    </div>
  );
}

export default App;
