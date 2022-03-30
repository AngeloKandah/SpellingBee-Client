import { Box, Center, Input } from '@mantine/core';

export default function GuessBox({ idOfWhosTurn, word, socket }) {
  async function endTurn(e) {
    const attempt = e.target.value
      .match(/\s*\w*/)[0]
      .trim()
      .toLowerCase();
    socket.emit('endTurn', { attempt, word }, (isCorrect) => {
      // Make something appear for x amount of seconds about whether they are wrong or right
      console.log(isCorrect);
    });
    e.target.value = '';
  }

  return (
    <Box
      sx={() => ({
        visibility: idOfWhosTurn !== socket.id ? 'hidden' : '',
        marginTop: '15vh',
        marginBottom: '15vh',
      })}
    >
      <Center key='spellingBox'>
        <Input
          id='spellingAttempt'
          type='text'
          onKeyDown={(e) => e.key === 'Enter' && endTurn(e)}
          placeholder='Enter attempt'
        />
      </Center>
    </Box>
  );
}
