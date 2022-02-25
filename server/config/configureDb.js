const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

function configureDb() {
  const route = path.join(__dirname, "db.json");
  const adapter = new FileSync(route);
  const db = low(adapter);

  return { db };
}

module.exports = {
  configureDb,
};
