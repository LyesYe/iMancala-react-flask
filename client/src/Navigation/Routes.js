import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '../Pages/Home/Home.jsx';
import Game from '../Pages/Game/Game.jsx';
import Game2 from '../Pages/Game2/Game2.jsx';

/**
 * Routes component containing routes for the whole application
 * @returns {JSX}
 */
const Routess = () => (
    <Routes>
        <Route  path='/' element={Home} />
        <Route  path='/game' element={Game2} />

        {/* The router goes through all the routes sequentially from the top and uses the first match it finds. That means your 404 needs to come after all other routes and redirects. */}

        {/* <Route component={Page404} /> */}
    </Routes>
);

export default Routess;