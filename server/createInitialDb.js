/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { games, players } = require("./db_data");
const data = JSON.stringify({ games, players });
const filepath = path.join(__dirname, "config", "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
