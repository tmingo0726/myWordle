import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storeCurrentPlayer, clearCurrentPlayer, getCurrentPlayer } from '../auth/utility';
import PieChart from "./piechart";
import {Chart, ArcElement} from 'chart.js';
Chart.register(ArcElement);

let totalGames = 0;
let successRate = 0;
let oneguess, twoguess, threeguess, fourguess, fiveguess, sixguess, failedguess;


const Profile = (props) => {

  const [userData, setUserData] = useState({
    labels: ['1 Guess', '2 Guess', '3 Guess', '4 Guess', '5 Guess', '6 Guess', 'Failed Guess'],
    datasets: [{
      label: "Guess Distribution",
      data: [oneguess, twoguess, threeguess, fourguess, fiveguess, sixguess, failedguess],
      backgroundColor: ['green', 'blue', 'red', 'brown', 'purple', 'yellow', 'orange']}]
  });
  

  const path = "http://localhost:4000/api";
  
  const currentPlayer = getCurrentPlayer();  
  console.log("Inside profile page and current player is ", currentPlayer);

  useEffect(() => {

    console.log("In useEffect for profile", userData);
    getStats(currentPlayer);
           
  }, []);

  const getStats = async (player) => {

      console.log("Inside getStats call", player);
      const response = await fetch(`${path}/stats/${player}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("DATA is ", data);
      if (data.success) {
        console.log("DATA:", data.data.gamesplayed);
        totalGames = data.data.gamesplayed;
        successRate = Math.round((((totalGames) - data.data.failedguess)/totalGames) * 100);
        oneguess = data.data.oneguess;
        twoguess = data.data.twoguess;
        threeguess = data.data.threesguess;
        fourguess = data.data.fourguess;
        fiveguess = data.data.fiveguess;
        sixguess = data.data.sixguess;
        failedguess = data.data.failedguess;
        setUserData({
          labels: ['1 Guess', '2 Guess', '3 Guess', '4 Guess', '5 Guess', '6 Guess', 'Failed Guess'],
          datasets: [{
            label: "Guess Distribution",
            data: [oneguess, twoguess, threeguess, fourguess, fiveguess, sixguess, failedguess],
            backgroundColor: ['green', 'blue', 'red', 'brown', 'purple', 'yellow', 'orange']}]
        });
        
      } else {
        alert("The logged in Player has played no games");
      }
      
  }
  
  return (
        <div style={{color:'black'}}>
          <h2>Welcome to the {currentPlayer} Game Stats Page</h2>
          <h3>Total Games Played: {totalGames}</h3>
          <h3>Success Rate: {successRate}%</h3>
          <div style={{ width: 750, backgroundColor: "whitesmoke"}}>
            <PieChart chartData={userData}/>
          </div>
        </div>
  )
};
export default Profile;
