import { Box, Center, Stack, Title } from '@mantine/core';

export default function WordStack({ currentPlayerId, currentWord, socket }) {
  return (
    <Box
      sx={() => ({
        visibility: currentPlayerId !== socket.id ? '' : 'hidden',
        marginTop: '15vh',
        marginBottom: '15vh',
      })}
    >
      <Center key='wordStack'>
        <Stack align='center'>
          <Title
            size='xl'
            weight={700}
            sx={() => ({
              margin: '2rem',
            })}
          >
            {currentWord}
          </Title>
          <p>Their guess</p>
        </Stack>
      </Center>
    </Box>
  );
}
