import { Box, Center, Stack, Title } from '@mantine/core';

export default function WordStack({ idOfWhosTurn, word, socket }) {
  return (
    <Box
      sx={() => ({
        visibility: idOfWhosTurn !== socket.id ? '' : 'hidden',
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
            {word}
          </Title>
          <p>Their guess</p>
        </Stack>
      </Center>
    </Box>
  );
}
