import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  function checkRoomCode(roomCode) {
    if (roomCode.length !== 21) {
      return;
    }
    navigate(`/room#${roomCode}`);
  }
  return (
    <div>
      <button type='button'>
        <Link to='/room'>Create Room</Link>
      </button>
      <p>Or Join A Room</p>
      <input
        type='text'
        onKeyDown={(e) =>
          e.key === 'Enter' ? checkRoomCode(e.target.value) : null
        }
        placeholder='Enter room code'
      />
    </div>
  );
}
