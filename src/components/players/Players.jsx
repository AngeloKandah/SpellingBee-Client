import { Box, Center } from '@mantine/core';
import Player from './Player';

export default function Players({ players }) {
  return (
    <Box
      sx={() => ({
        maxWidth: '100vw',
      })}
    >
      <Center>
        {players.map((player) => (
          <Player key={player} player={player}></Player>
        ))}
      </Center>
    </Box>
  );
}
