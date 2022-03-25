import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Room() {
  const [word, setWord] = useState('Fetching Word');

  useEffect(() => {
    const hash = location.hash.substring(1);
    const socket = io('http://localhost:5000');
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on('word', (word) => setWord(word));
    if (hash.length === 6) {
      socket.emit('joiningRoom', { roomCode: hash });
      return;
    }
    socket.emit('createRoom');
    socket.on('roomCode', (code) => (location.hash = code));
  }, []);

  return (
    <div>
      <input
        type='text'
        onKeyDown={(e) => e.key === 'Enter' ? null : null}
      />
      <p>{word}</p>
    </div>
  );
}
