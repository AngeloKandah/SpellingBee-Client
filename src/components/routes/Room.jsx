import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Room() {
  const [word, setWord] = useState('Fetching Word');
  const [socket, setSocket] = useState('');
  const [showStartGameButton, setStartGameButton] = useState(false);
  const [idOfTurn, setTurn] = useState('');

  useEffect(() => {
    const hash = location.hash.substring(1);
    const socket = io('http://localhost:5000');
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000);
    });
    setSocket(socket);
    socket.on('nextWord', ({ nextWord, whosTurn }) => {
      setWord(nextWord);
      setTurn(whosTurn);
    });
    if (hash.length === 21) {
      socket.emit('joiningRoom', { roomCode: hash }, (word) => setWord(word));
      return;
    }
    socket.emit('createRoom', ({ word, startGameButton, roomCode }) => {
      setWord(word);
      setStartGameButton(startGameButton);
      location.hash = roomCode;
    });
  }, []);

  async function endTurn(e) {
    const attempt = e.target.value
      .match(/\s*\w*/)[0]
      .trim()
      .toLowerCase();
    socket.emit('checkSpelling', { attempt, word }, (isCorrect) =>
      // Make something appear for x amount of seconds about whether they are wrong or right
      console.log(isCorrect)
    );
    socket.emit('nextTurn');
    e.target.value = '';
  }
  function startGame() {}

  return (
    <div>
      <p>{word}</p>
      <input
        id='spellingAttempt'
        type='text'
        onKeyDown={(e) => (e.key === 'Enter' ? endTurn(e) : null)}
        placeholder='Enter attempt'
      />
      <p></p>
      {showStartGameButton ? (
        <button onClick={() => startGame()}>Start Game</button>
      ) : null}
    </div>
  );
}
