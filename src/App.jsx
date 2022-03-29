import { Routes, Route } from 'react-router-dom';
import { Home, Room } from './components/routes';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='room' element={<Room />} />
    </Routes>
  );
}

export default App;
