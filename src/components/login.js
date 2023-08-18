import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { storeCurrentPlayer, clearCurrentPlayer, getCurrentPlayer } from '../auth/utility';


const Login = (props) => {

  const currentPlayer = props.currentPlayer;
  const setCurrentPlayer = props.setCurrentPlayer;
  const setloginstr = props.setloginstr;
  const setLoggedIn = props.setLoggedIn;
  const token = props.token;
  const setToken = props.setToken;

  let UserName = '';
  
  const path = "http://localhost:4000/api";
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleUserLogout = (event) => {
    clearCurrentPlayer();
    //clearCurrentToken();
    //clearCurrentUser();
  }

  const createGamesDBEntry = async (playerid) => {

    const response = await fetch(`${path}/stats/${playerid}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          username: document.getElementById("username").value,
          password: document.getElementById("password").value
        }
      )
    });

  }

  const handlerUserLogin = async () => {

    console.log("User name and password are ", document.getElementById("username").value, document.getElementById("password").value);

    const response = await fetch(`${path}/players/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
          }
        )
    });
    
    const data = await response.json();
    console.log("Data is ", data);
    
    if (!data.success) {
        alert(data.message);
        //bError = true;
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("username").focus();
        //setloginstr("Log In");
    } else {
        alert(data.message);
        //setToken(data.token);
        storeCurrentPlayer(data.player);
        setloginstr("Log Out");
        setLoggedIn(true);
        //Create an initial games played record in the games DB with every field = 0
        createGamesDBEntry(data.id);
        //storeCurrentToken(data.token);
        navigate('/game');  
    }
}

const saveUsername = () => {

  UserName = document.getElementById("username").value;
  console.log("Inside save username", UserName);

}

  return (
    <div className="container">
      
      <form id="login" className="user-login" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          onBlur={saveUsername}
          type="text"
          placeholder="Enter username"
          required
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          name="password"
          //pattern="(?=.*\d)(?=.*[a-z])(?=.{8,}"
          placeholder="Enter password"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          required
        ></input>
        <input type="submit" onClick={handlerUserLogin} value="Login"></input>
        <div className="form-redirect-text">
                Not a member?{" "}
                <Link className="form-redirect-link" to="/register">
                  Sign Up!
                </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;