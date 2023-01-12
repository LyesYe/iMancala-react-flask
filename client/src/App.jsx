// import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home.jsx';
// import {lastIndexOf, substr} from '@7urtle/lambda';
import { Route, Routes} from 'react-router-dom';
import Game from './Pages/Game/Game';
import Game2 from './Pages/Game2/Game2';
// import Mancala from './Pages/GameTemp/Mancala';
// import Routes from './Navigation/Routes';
import {RemoveScrollBar} from 'react-remove-scroll-bar';
// import Choose from './Pages/Choose/Choose';




function App() {
  
  return (
    <>
    {/* <RemoveScrollBar /> */}
    {/* <Home/> */}
    <Game2/>

    </>

  );
}

export default App;
