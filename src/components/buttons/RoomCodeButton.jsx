import { Button } from '@mantine/core';

export default function RoomCodeButton({ hash, clipboard }) {
  return (
    <Button
      onClick={() => clipboard.copy(hash.substring(1))}
      styles={() => ({
        root: {
          backgroundColor: clipboard.copied ? '#187D42' : '#00acee',
          border: 0,
          margin: 0,
          height: 42,
          paddingLeft: 20,
          paddingRight: 20,
        },
      })}
    >
      {clipboard.copied ? 'Copied' : 'Copy Room Code'}
    </Button>
  );
}
