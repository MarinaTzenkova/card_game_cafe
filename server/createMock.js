/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { games, players } = require("./mockDataNew");
const data = JSON.stringify({ games, players });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
