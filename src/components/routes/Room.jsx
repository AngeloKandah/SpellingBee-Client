import { useClipboard, useHash } from '@mantine/hooks';
import { Button, Center, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ROOM_CODE_LENGTH } from '../../constants';
import { RoomCodeButton } from '../buttons';
import { Players } from '../players';

export default function Room() {
  const [socket, setSocket] = useState('');
  const [word, setWord] = useState('');
  const [idOfTurn, setTurn] = useState('');
  const [creatingRoom, setCreatingRoom] = useState(true);
  const [players, setPlayers] = useState([]);

  const clipboard = useClipboard({ timeout: 1500 });
  const [hash, setHash] = useHash();

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
    if (hash.length === ROOM_CODE_LENGTH) {
      socket.emit('joiningRoom', { roomCode: hash }, (word) => setWord(word));
      setCreatingRoom(false);
      return () => null;
    }
    socket.emit('createRoom', ({ word, roomCode }) => {
      setWord(word);
      setHash(roomCode);
      setTurn(socket.id);
      setCreatingRoom(false);
    });
    return () => null;
  }, []);

  async function endTurn(e) {
    const attempt = e.target.value
      .match(/\s*\w*/)[0]
      .trim()
      .toLowerCase();
    socket.emit('endTurn', { attempt, word }, (isCorrect) => {
      // Make something appear for x amount of seconds about whether they are wrong or right
      console.log(isCorrect);
    });
    e.target.value = '';
  }

  return (
    <div>
      {creatingRoom ? (
        <p>Creating room...</p>
      ) : (
        [
          <RoomCodeButton hash={hash} clipboard={clipboard} />,
          idOfTurn !== socket.id ? (
            <Center>
              <Stack align='center'>
                <p>{word}</p>
                <p>Their guess</p>
              </Stack>
            </Center>
          ) : (
            <div>
              <input
                id='spellingAttempt'
                type='text'
                onKeyDown={(e) => e.key === 'Enter' && endTurn(e)}
                placeholder='Enter attempt'
              />
            </div>
          ),
          <Players />,
        ]
      )}
    </div>
  );
}
