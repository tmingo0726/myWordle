import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import About from './components/about';
import Game from './components/game';
import Profile from './components/profile';
import Login from './components/login';
import Register from './components/register';
import Recipes from './components/recipes';
import { clearCurrentPlayer, getCurrentPlayer, storeCurrentPlayer } from './auth/utility';

//let loginstr;

const App = () => {

    const [currentPlayer, setCurrentPlayer] = useState("");
    const [currentRow, setCurrentRow] = useState(1);
    const [currentLetter, setCurrentLetter] = useState('');
    const [loggedIn, setLoggedIn] = useState(getCurrentPlayer() ? true : false);
    const [loginstr, setloginstr] = useState("Log In");
    const [currentData, setCurrentData] = useState();
    const [allFoods, setAllFoods] = useState([]);

    let navigate = useNavigate();
    
    
    useEffect(() => {

        console.log("in useEffect and loginstr is", loginstr);

        if (loggedIn) {
            console.log("HERE 1");
            setLoggedIn(true);
            setloginstr("Log Out");
        } else {
            console.log("HERE 2");
            setloginstr("Log In");
            setLoggedIn(false);
        }

               
    }, [loginstr]);

    
    const setLoginStr = () => {

        if (loginstr === "Log Out") {
            console.log("Changing menu option to Log In");
            setLoggedIn(false);
            clearCurrentPlayer();
            setloginstr("Log In");
            navigate('./login');
        } else {
            console.log("Changing menu option to Log Out");
            setLoggedIn(true);
            setloginstr("Log Out");
        }
    }

    
    return (
        <div>
            <h1>Mingo's Wordle</h1>
            <nav className="navbar">
              <ul className="nav-list">
                {/*<li className="list-item"><Link to="/game">Game  </Link></li>*/}
                {/*<li className="list-item"><Link to="/profile">Profile </Link></li>*/}
                <li className="list-item" onClick={setLoginStr}><Link to="/login">{loginstr} </Link></li>
                <li className="list-item"><Link to="/recipes">Recipes  </Link></li>
                {/*<li className="list-item"><Link to="/register">Register  </Link></li>*/}
                {/*<li className="list-item"><Link to="/about">About </Link></li>*/}
              </ul>
           </nav>

           <Routes>
              <Route  path='/recipes' element={<Recipes allFoods={allFoods} setAllFoods={setAllFoods}/>}></Route>
              <Route  path='/login' element={<Login currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} setloginstr={setloginstr} setLoggedIn={setLoggedIn}/>}></Route>
              <Route  path='/register' element={<Register currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}/>}></Route>
              <Route  path='/game' element={<Game currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} currentRow={currentRow}
                                            currentLetter={currentLetter} setCurrentLetter={setCurrentLetter}/>}></Route>
              <Route  path='/profile' element={<Profile currentPlayer={currentPlayer} currentData={currentData}/>}></Route>                              

           </Routes>
        </div>
    )


}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Router>
                 <App tab="home" />
            </Router>);

