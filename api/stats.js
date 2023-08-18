const express = require("express");
const statsRouter = express.Router();
const {
  getStatsById,
  updateStatsByPlayerId,
  createInitialDBStatsRecord,
} = require("../db/stats");


const { getPlayerByUsername } = require("../db/player");

// Get all games for player passed in
statsRouter.get('/:player', async (req, res, next) => {

  console.log("Inside stats router get", req.params.player);
  const player = await getPlayerByUsername(req.params.player);

  console.log("Inside stats Router and player is ", player.id);

  const stats = await getStatsById(player.id);
  console.log("statsRouter GET STATS are ", stats);

  try {
    if (stats && stats !== 'undefined') {
      //const token = jwt.sign(customer, JWT_SECRET, { expiresIn: "1w" });

      console.log("About to send STATS", stats);
      res.send({
        data: stats,
        success: true,
        message: "Stat Retrieval successful.",
        
      });
    } else {
      res.send({
        success: false,
        message: "This player has no games.",
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
  
});


statsRouter.patch('/:guess', async (req, res, next) => {

  const { username } = req.body;
  const winningGuess = req.params.guess;

  console.log("PATCH CALL AND PLAYER IS", username);
  const record = await getPlayerByUsername(username);
  console.log("Record is", record, " and winning guess is ", winningGuess);

  if (record) {
    updateStatsByPlayerId(record.id, winningGuess);
  }

});

statsRouter.post("/:playerid", async (req, res, next) => {

  const { username, password } = req.body;
  const id = req.params.playerid;

  console.log("PLAYER ID PASSED INTO statsRouter POST for initial record is ", id);
  createInitialDBStatsRecord(id);


});

module.exports = statsRouter;