const client = require("./client");

client.connect();

const getStatsById = async (playerid) => {

  console.log("Inside getStatsByID", playerid);

    try {
      const {
        rows: [stats],
      } = await client.query(`
              SELECT *
              FROM games
              WHERE playerid = ${playerid};
          `);
  
      return stats;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateStatsByPlayerId = async (playerid, guess) => {

    try {
      const {
        rows: [stats],
      } = await client.query(`
              UPDATE games
              SET ${guess} = ${guess} + 1, gamesplayed = gamesplayed + 1
              WHERE playerid = ${playerid};
          `);
  
      return stats;
    } catch (error) {
      console.error(error);
      throw error;
    }

  };

  const createInitialDBStatsRecord = async (playerid) => {

    console.log("PLAYER ID PASSED IN IS", playerid);

    //First let's see if there is already a record for this player in the games DB
    const retVal = await getStatsById(playerid);

    console.log("RetVal is ", retVal);


    if (!retVal) {
      try {
      const {
        rows: [stats],
      } = await client.query(`
              INSERT INTO games (playerid, gamesplayed, oneguess, twoguess, threesguess, fourguess, fiveguess, sixguess, failedguess)
              VALUES (${playerid}, 0, 0, 0, 0, 0, 0, 0, 0)
              
          `);
  
      return stats;
      } catch (error) {
      console.error(error);
      throw error;
      }
  }

  }

  module.exports = {
    getStatsById,
    updateStatsByPlayerId,
    createInitialDBStatsRecord,
  };