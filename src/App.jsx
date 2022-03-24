import { Routes, Route } from 'react-router-dom';
import { Home, Room } from './components/routes';
import './App.css';

function App() {
  //This communicates with the server, do more tests and finalize more tomorrow, happy to have it working.
  /* function test(answer) {
    socket.emit('checkAnswer', 'idk!', (response) => console.log(response));
    console.log('test');
  } */

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
