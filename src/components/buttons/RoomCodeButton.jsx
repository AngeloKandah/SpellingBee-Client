import { Button } from '@mantine/core';

export default function RoomCodeButton({ hash, clipboard }) {
  return (
    <Button
      onClick={() => clipboard.copy(hash.substring(1))}
      styles={() => ({
        root: {
          backgroundColor: '#00acee',
          border: 0,
          marginTop: '1rem',
          marginLeft: '1rem',
          height: '3rem',
          width: '10rem',
        },
      })}
    >
      {clipboard.copied ? 'Copied' : 'Copy Room Code'}
    </Button>
  );
}
