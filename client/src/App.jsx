// import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home.jsx';
// import {lastIndexOf, substr} from '@7urtle/lambda';
import { Route, Routes, useLocation} from 'react-router-dom';
import Game from './Pages/Game/Game';
import Game2 from './Pages/Game2/Game2';
import GameAI from './Pages/GameAI/GameAI.jsx';
// import Mancala from './Pages/GameTemp/Mancala';
// import Routes from './Navigation/Routes';
import {RemoveScrollBar} from 'react-remove-scroll-bar';
import Choose from './Pages/Choose/Choose';
import Settings from './Pages/Settings/Settings';


function App() {
  
  return (
    <>
    {/* <RemoveScrollBar /> */}
    {/* <Home/>
    <Choose/> */}
    {/* <Game2/> */}
    <Routes>

        <Route  path='/' element={<Home/>} />
        <Route  path='/choice' element={<Choose/>} />
        <Route  path='/settings' element={<Settings/>} />
        <Route  path='/settingsAI' element={<Choose/>} />
        <Route  path='/game' element={<Game2/>} />
        <Route  path='/gameAI' element={<GameAI/>} />
        {/* <Route  path='/game' element={Game2} /> */}

        {/* The router goes through all the routes sequentially from the top and uses the first match it finds. That means your 404 needs to come after all other routes and redirects. */}

        {/* <Route component={Page404} /> */}
    </Routes>

    </>

  );
}

export default App;
