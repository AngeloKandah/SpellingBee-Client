import { Link } from 'react-router-dom';

export default function Home() {
  function createRoom() {}
  return (
    <div>
      <button type='button' onClick={() => createRoom()}>
        <Link to='/room'>Create Room</Link>
      </button>
      <button>
        <Link to='/room'>Join Room</Link>
      </button>
    </div>
  );
}
