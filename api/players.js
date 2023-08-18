const express = require("express");
const playersRouter = express.Router();
const {
  getPlayerById,
  getPlayer,
  createPlayer,
  getPlayerByUsername,
} = require("../db/player");

// LOGIN
playersRouter.post("/login", async (req, res, next) => {

  console.log("ARE WE GETTING HERE?????");

  const { username, password } = req.body;
  const player = await getPlayer({ username, password });

  console.log("Inside POST LOGIN and player is ", player);

  if (!username || !password) {
    next({
      error: "MissingCredentials",
      message: "Please provide both a username and password",
    });
  }

  try {
    if (player) {
      //const token = jwt.sign(customer, JWT_SECRET, { expiresIn: "1w" });

      res.send({
        player: player.username,
        success: true,
        message: "Login successful.",
        
      });
    } else {
      next({
        error: "Invalid Credentials",
        message: "Incorrect username or password.",
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

// POST /api/players/register
playersRouter.post('/register', async (req, res, next) => {

  const { username, password } = req.body;

  try {

    console.log("ABOUT TO CALL getPlayerByUsername", username);
    const _user = await getPlayerByUsername(username);
    
    if(_user) {
      res.send({
        success: false,
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    } else {

      console.log("ABOUT TO CALL createPlayer");
      const player = await createPlayer({username, password});

      console.log("AFTER createPlayer and player is ", player);
    
      //const token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET, {expiresIn: '1w'});
      res.send({success: true, player: player.username, message: "Thank you for signing up"});
    }
  } catch ({ name, message }) {
    next({ name, message})
  }
});

module.exports = playersRouter;