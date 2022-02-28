const { playerDbHelper, gameDbHelper } = require("../../service");

module.exports = (app, db) => {
  const dbService = playerDbHelper(db);
  const gameService = gameDbHelper(db);
  app.get("/players/:id/:playerId", (req, res) => {
    const id = req.params["id"];
    const playerId = parseInt(req.params["playerId"]);

    const players = dbService.getPlayers();
    const game = gameService.getGame(id);

    // we return only the other 2 players
    const sanitized = players
      .filter((player) => player.id !== playerId)
      .map((player) => {
        const hand =
          game.hands.find((hand) => hand.playerId === player.id)?.currentHand
            .length ?? 0;
        return {
          name: player.name,
          hand,
        };
      });
    res.send(sanitized);
  });

  app.get("/player/:gameId/:id", (req, res) => {
    const id = req.params["id"];
    console.log("Fetching player " + id);
    const gameId = req.params["gameId"];
    const game = gameService.getGame(gameId);

    const player = dbService.getPlayer(id);
    const hand = game.hands.find((hand) => hand.playerId === parseInt(id)) ?? {
      currentHand: [],
    };

    const sanitized = {
      name: player.name,
      hand: hand.currentHand,
      id: player.id,
    };

    res.send(sanitized);
  });
};
