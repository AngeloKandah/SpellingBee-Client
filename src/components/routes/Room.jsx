import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Room() {
  const [time, setTime] = useState('fetching');
  const [word, setWord] = useState('Fetching Word');
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash.length === 6) {
      const socket = io('http://localhost:5000');
      socket.emit('joiningRoom', { roomCode: hash });
      socket.on('time', (data) => setTime(data));
      socket.on('wordList', (wordList) => setWordList(wordList));
      return;
    }
    const socket = io('http://localhost:5000');
    socket.emit('createRoom');
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on('time', (data) => setTime(data));
    socket.on('roomCode', (code) => (location.hash = code));
    socket.on('wordList', (data) => console.log(data));
    socket.on('disconnect', () => console.log('Disconnected'));
  }, []);
  console.log(wordList);
  return (
    <div>
      <input
        type='text'
        onKeyDown={(e) => (e.key === 'Enter' ? test(e.target.value) : null)}
      />
      <p>{time}</p>
      <p>{word}</p>
      <p>{wordList[0]}</p>
    </div>
  );
}
