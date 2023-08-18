const client = require("./client");

const getPlayer = async ({ username, password }) => {

    
    try {
      const player = await getPlayerByUsername(username);
      console.log("Inside getPlayer and player is ", player);
      if (!player) {
        return;
      } else {
        return player;
      }
  
      //const hashedPassword = customer.password;
      //const passwordsMatch = await bcrypt.compare(password, hashedPassword);
      //if (passwordsMatch) {
        
        
      //}
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getPlayerByUsername = async (username) => {

    console.log("Are we in getPlayerByUsername?", username);

    try {
      const {
        rows: [player],
      } = await client.query(
        `
              SELECT *
              FROM player
              WHERE username = '${username}';
          `
      );
  
      return player;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  async function createPlayer({ username, password }) {
  
    //const SALT_COUNT = 10;
  
    //const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    //password = hashedPassword;
  
    try {
      const { rows: [player] } = await client.query(`
      INSERT INTO player (username, password) VALUES ($1, $2)
      RETURNING *;
      `, [username, password]);
  
      return player;
    } catch (error) {
      throw error;
    }
    
  }

  
  module.exports = {
    getPlayer,
    getPlayerByUsername,
    createPlayer,
  }; 