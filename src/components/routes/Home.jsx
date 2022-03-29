import { Link } from 'react-router-dom';
import { Button, Input } from '@mantine/core';
import { RoomCode } from '../input';

export default function Home() {

  return (
    <div>
      <Button component={Link} to='/room'>
        Create Room
      </Button>
      <p>Or Join A Room</p>
      <RoomCode />
    </div>
  );
}
