import { Routes, Route } from 'react-router-dom';
import { Home, Room } from './components/routes';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='room' element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
