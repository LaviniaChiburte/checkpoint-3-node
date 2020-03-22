const express = require("express");
const app = express();
const models = require("./models");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3000;

const api = require("./api");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

//API playlist & track
api(app, models);

//Sync database
models.sequelize.sync().then(() =>
  app.listen(port, err => {
    if (err) {
      throw new Error("Something is not working...");
    }

    console.log(`all set on ${port}`);
  })
);
