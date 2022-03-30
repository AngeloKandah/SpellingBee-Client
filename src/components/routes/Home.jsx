import { Link } from 'react-router-dom';
import { Button, Center, Input, Stack, Title } from '@mantine/core';
import { RoomCode } from '../input';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  return (
    <Center sx={() => ({
      marginTop: '25vh',
    })}>
      <Stack align='center'>
        <Title>SPELLING BEE</Title>
        <Input
          type='text'
          placeholder='Enter Name'
          onKeyUp={(e) => setName(e.target.value)}
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
