const express = require("express");
const statsRouter = express.Router();
const {
  getStatsById,
  
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

module.exports = statsRouter;