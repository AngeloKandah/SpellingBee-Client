import { useClipboard, useHash } from '@mantine/hooks';
import { Center, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ROOM_CODE_LENGTH } from '../../constants';
import { RoomCodeButton } from '../buttons';
import { Players } from '../players';
import { GuessBox } from '../input';
import WordStack from '../word/WordStack';

export default function Room() {
  const [socket, setSocket] = useState('');
  const [nextTurn, setNextTurn] = useState({});
  const { word, idOfWhosTurn } = nextTurn;

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
    socket.on('nextWord', ({ word, idOfWhosTurn }) => {
      setNextTurn({ word, idOfWhosTurn });
    });
    socket.on('newPlayer', (players) => setPlayers(players));
    if (hash.substring(1).length === ROOM_CODE_LENGTH) {
      socket.emit(
        'joiningRoom',
        { roomCode: hash.substring(1) },
        ({ word }) => {
          setNextTurn({ word });
          setCreatingRoom(false);
        }
      );
      return () => null;
    }
    socket.emit('createRoom', ({ word, roomCode }) => {
      setNextTurn({ word, idOfWhosTurn: socket.id });
      setPlayers([socket.id]);
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
            key={word}
            idOfWhosTurn={idOfWhosTurn}
            word={word}
            socket={socket}
          />,
          <GuessBox
            key='guessBox'
            idOfWhosTurn={idOfWhosTurn}
            word={word}
            socket={socket}
          />,
          <Players key='playerList' players={players} />,
        ]
      )}
    </div>
  );
}
