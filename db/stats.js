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

  module.exports = {
    getStatsById,
    
  };