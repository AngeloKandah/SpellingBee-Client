import { Link } from 'react-router-dom';
import { Button, Center, Input, Stack, Title } from '@mantine/core';
import { RoomCode } from '../input';

export default function Home({ playerName, setPlayerName }) {
  return (
    <Center
      sx={() => ({
        marginTop: '25vh',
      })}
    >
      <Stack align='center'>
        <Title>SPELLING BEE</Title>
        <Input
          type='text'
          placeholder='Enter Name'
          onKeyUp={(e) => setPlayerName(e.target.value)}
          defaultValue={playerName}
        />
        <Button component={Link} to='/room' state={{ name }}>
          Create Room
        </Button>
        <div>Or Join A Room</div>
        <RoomCode />
      </Stack>
    </Center>
  );
}
