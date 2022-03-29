import { InputWrapper, Input } from '@mantine/core';
import { ROOM_CODE_LENGTH } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function RoomCode() {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  function checkRoomCode(roomCode) {
    if (roomCode.length !== ROOM_CODE_LENGTH) {
      setShowError(true);
      return;
    }
    navigate(`/room#${roomCode}`);
  }

  return (
    <InputWrapper
      id='roomCode'
      label='Enter Room Code'
      error={showError ? 'Room code not valid' : ''}
    >
      <Input
        id='roomCode'
        type='text'
        onKeyDown={(e) => e.key === 'Enter' && checkRoomCode(e.target.value)}
        placeholder='Enter room code'
      />
    </InputWrapper>
  );
}
