import { Box, Center } from '@mantine/core';
import Player from './Player';

export default function Players({ players }) {
  console.log(players)
  return (
    <Box
      sx={() => ({
        maxWidth: '100vw',
      })}
    >
      <Center>
        {Object.values(players).map(({id, playerName}) => (
          <Player key={id} player={playerName} />
        ))}
      </Center>
    </Box>
  );
}
