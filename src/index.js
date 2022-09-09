import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import About from './components/about';
import Game from './components/game';


const App = () => {

    let currentUser = "Muzzy";

return (
        <div>
           <nav className="navbar">My Wordle
              <ul className="nav-list">
                <li className="list-item"><Link to="/game">Game  </Link></li>
                {/*<li className="list-item"><Link to="/profile">Profile   </Link></li>
                <li className="list-item" onClick={logOutUser}><Link to="/login">{loginstr} </Link></li>
                <li className="list-item"><Link to="/register">Register  </Link></li>*/}
                <li className="list-item"><Link to="/about">About </Link></li>
              </ul>
           </nav>

           <Routes>
              <Route  path='/about' element={<About />}></Route>
              <Route  path='/game' element={<Game currentUser={currentUser}/>}></Route>

           </Routes>
        </div>
    )


}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Router>
                 <App tab="home" />
            </Router>);

