import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import About from './components/about';
import Game from './components/game';
import Profile from './components/profile';
import Login from './components/login';
import Register from './components/register';
import { clearCurrentPlayer, getCurrentPlayer, storeCurrentPlayer } from './auth/utility';



const App = () => {

    const [currentPlayer, setCurrentPlayer] = useState("");
    const [currentRow, setCurrentRow] = useState(1);
    const [currentLetter, setCurrentLetter] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    
    
    let loginstr = "Log In";

    useEffect(() => {

        //setCurrentRow(currentRow);
        //setCurrentLetter('');
        //setLoginStr(logInStr);
        
    });//, [logInStr]);

    const LogInLogOut = () => {

        console.log("Inside LogInLogOut");


    }


    const setLoginStr = () => {

        if (loginstr === "Log Out") {
            console.log("Changing menu option to Log In");
            setLoggedIn(false);
            clearCurrentPlayer();
            loginstr = "Log In";
            
        } else {
            console.log("Changing menu option to Log Out");
            setLoggedIn(true);
            
           // clearCurrentPlayer();
            loginstr = "Log In";
        }

        /*
        let player = getCurrentPlayer();
        if (player) {
            console.log("checking the login user info", player);
            storeCurrentPlayer(player);
            setLoggedIn(true);
            setLogInStr("Log Out");
            //setToken(null);
        } else {
            console.log("Changing menu option to Log In");
            setLoggedIn(false);
            setLogInStr("Log In");
            clearCurrentPlayer();
        }*/
    }

    
    return (
        <div>
            <h1>Mingo's Wordle</h1>
            <nav className="navbar">
              <ul className="nav-list">
                {/*<li className="list-item"><Link to="/game">Game  </Link></li>*/}
                {/*<li className="list-item"><Link to="/profile">Profile </Link></li>*/}
                <li className="list-item" onClick={setLoginStr}><Link to="/login">{loginstr} </Link></li>
                {/*<li className="list-item"><Link to="/register">Register  </Link></li>*/}
                {/*<li className="list-item"><Link to="/about">About </Link></li>*/}
              </ul>
           </nav>

           <Routes>
              <Route  path='/about' element={<About />}></Route>
              <Route  path='/login' element={<Login currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}/>}></Route>
              <Route  path='/register' element={<Register currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}/>}></Route>
              <Route  path='/game' element={<Game currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} currentRow={currentRow}
                                            currentLetter={currentLetter} setCurrentLetter={setCurrentLetter}/>}></Route>
              <Route  path='/profile' element={<Profile currentPlayer={currentPlayer}/>}></Route>                              

           </Routes>
        </div>
    )


}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Router>
                 <App tab="home" />
            </Router>);

