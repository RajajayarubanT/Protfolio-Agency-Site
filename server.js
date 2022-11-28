const express = require("express");
const app = express();
const { PORT, MONGO_URI } = require("./config/key");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path")

require('dotenv').config();


app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
/* -----production-----*/

__dirname = path.resolve()
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send("API is Running");
  })
}

//PORT
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Error" + err);
  } else {
    console.log("Server in running on port: " + PORT);
  }
});
