const gameDbHelper = (db) => {
  function getGame(id) {
    return db.get("games").get(id).value();
  }

  function getGames() {
    return db.get("games").value() ?? [];
  }

  function addGame(game) {
    db.get("games").push(game).value();
    db.write();
  }

  function updateGame(id, props) {
    db.get("games")
      .get(id)
      .assign({ ...props });
    db.write();
  }

  return { getGame, getGames, addGame, updateGame };
};

const playerDbHelper = (db) => {
  function getPlayer(id) {
    return db.get("players").get(id).value();
  }
  function getPlayers() {
    return db.get("players").value() ?? [];
  }
  function addPlayer(player) {
    db.get("players").push(player).value();
    db.write();
  }

  return { getPlayer, getPlayers, addPlayer };
};

module.exports = {
  gameDbHelper,
  playerDbHelper,
};
