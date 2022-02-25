const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

const port = 8080;

require("./routes")(app);

const Blockchain = require("./src/blockchain");

global.difficulty = 5; // Difficulty to mine a particular block
global.blockchain = new Blockchain(); // Our copy of the blockchain
global.transactions = []; // Our current transactions

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/`);
});