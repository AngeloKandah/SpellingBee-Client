import { Routes, Route } from 'react-router-dom';
import { Home, Room } from './components/routes';
import { useState } from 'react';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState('');

  return (
    <Routes>
      <Route
        path='/'
        element={<Home playerName={playerName} setPlayerName={setPlayerName} />}
      />
      <Route path='room' element={<Room playerName={playerName} />} />
    </Routes>
  );
}

export default App;
