import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
//import { storeCurrentUser, storeCurrentToken, clearCurrentToken, getCurrentToken, clearCurrentUser } from './auth';



const Register = (props) => {

  const [newPlayer, setNewPlayer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //const setToken = props.setToken;
  //const token = props.token;
  const currentPlayer = props.currentPlayer;
  const setCurrentPlayer = props.setCurrentPlayer;

  const path = "http://localhost:4000/api";
  
  const handleSubmit = async (event) => {

    event.preventDefault();
  

    if (document.getElementById("password").value !== document.getElementById("confirmpassword").value) {
      alert("Passwords do not match...try again");
      document.getElementById("password").value = "";
      document.getElementById("confirmpassword").value = "";
      document.getElementById("password").focus();
    } else {
         
      console.log("NAME AND PASSWORD", newPlayer, newPassword);
      const response = await fetch(`${path}/players/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            username: newPlayer,
            password: newPassword,
          },
        ),
      });
      const data = await response.json();

      console.log("data from register call is ", data);
   
      if (data.success) {
        alert(data.message);
        console.log("Register message: ", data.message);
        //setToken(data.token);
        setCurrentPlayer(data.player.username);
        //storeCurrentToken(data.token);
        //storeCurrentUser(data.user);
      } else {
        alert("error occurred during registration process")
      }
    }
  };


  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        NAME
        <input
          type="text"
          placeholder="Enter username"
          onChange={(event) => {
            setNewPlayer(event.target.value);
            console.log("New user set to ", event.target.value);
          }}
        ></input>
        PASSWORD
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          onChange={(event) => {
            setNewPassword(event.target.value);
            console.log(event.target.value);
          }}
        ></input>
        CONFIRM PASSWORD
        <input
          id="confirmpassword"
          type="password"
          placeholder="Confirm password"
          //onChange={(event) => {
          //  setNewPassword(event.target.value);
           // console.log(event.target.value);
          //}}
          ></input>
        <button type="text">Register</button>
        
      </form>
    </div>
  );
};

export default Register;