//require("dotenv").config();
const client = require("./db/client");
const chalk = require('chalk');
const cors = require("cors");

const http = require("http");


const express = require("express");
const app = express();

app.use(express.json());

app.use(
    cors({
      origin: "*",
    })
  );

const apiRouter = require("./api");
app.use("/api", apiRouter);


app.get('*', async (req, res) => {
  res.status(404).send({
      error: 'Page not found',
      message: 'The page you are looking for was not found'
  });
});

client.connect();
const PORT = process.env["PORT"] ?? 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    chalk.blueBright("Server is listening on"),
    chalk.bold.yellowBright('PORT :', PORT),
    chalk.blueBright("Wordle if FUN!")
  );
});