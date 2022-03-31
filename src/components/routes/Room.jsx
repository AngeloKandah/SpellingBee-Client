import { useClipboard, useHash } from '@mantine/hooks';
import { Center, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ROOM_CODE_LENGTH } from '../../constants';
import { RoomCodeButton } from '../buttons';
import { Players } from '../players';
import { GuessBox } from '../input';
import { WordStack } from '../word';

export default function Room({ playerName }) {
  const [socket, setSocket] = useState('');
  const [nextTurn, setNextTurn] = useState({});
  const { currentWord, currentPlayerId } = nextTurn;

  const [creatingRoom, setCreatingRoom] = useState(true);
  const [players, setPlayers] = useState([]);

  const clipboard = useClipboard({ timeout: 1500 });
  const [hash, setHash] = useHash(location.hash);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000);
    });
    setSocket(socket);
    socket.on('nextWord', ({ currentWord, currentPlayerId }) => {
      setNextTurn({ currentWord, currentPlayerId });
    });
    socket.on('newPlayer', (players) => setPlayers(players));
    if (hash.substring(1).length === ROOM_CODE_LENGTH) {
      socket.emit(
        'joiningRoom',
        { roomCode: hash.substring(1), playerName },
        (currentWord) => {
          setNextTurn({ currentWord });
          setCreatingRoom(false);
        }
      );
      return () => null;
    }
    socket.emit('createRoom', { playerName }, ({ currentWord, roomCode }) => {
      setNextTurn({ currentWord, currentPlayerId: socket.id });
      setPlayers([{ id: socket.id, playerName }]);
      setHash(roomCode);
      setCreatingRoom(false);
    });
    return () => null;
  }, []);

  return (
    <div>
      {creatingRoom ? (
        <Center
          sx={() => ({
            width: '100vw',
            height: '100vh',
          })}
        >
          <Loader />
        </Center>
      ) : (
        [
          <RoomCodeButton key={hash} hash={hash} clipboard={clipboard} />,
          <WordStack
            key={currentWord}
            currentPlayerId={currentPlayerId}
            currentWord={currentWord}
            socket={socket}
          />,
          <GuessBox
            key='guessBox'
            currentPlayerId={currentPlayerId}
            currentWord={currentWord}
            socket={socket}
          />,
          <Players key='playerList' players={players} />,
        ]
      )}
    </div>
  );
}
