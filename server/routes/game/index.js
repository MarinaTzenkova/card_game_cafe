const { gameDbHelper } = require("../../service");

module.exports = (app, db) => {
  const dbService = gameDbHelper(db);
  app.get("/games", (req, res) => {
    const games = dbService.getGames();

    const sanitized = games.map((game) => ({
      name: game.name,
      id: game.id,
      joined: game.playerIds.length,
      required: game.amountOfParticipants,
    }));
    res.send(sanitized);
  });

  app.get("/game/:id", (req, res) => {
    const id = req.params["id"];

    const game = dbService.getGame(id);
    const sanitized = {
      name: game.name,
      id: game.id,
      mode: game.mode,
      currentRound: game.currentRound,
      currentPlayer: game.currentPlayer,
      deck: game.currentDeck,
      placed: game.placedCards,
      taken: game.takenCards,
      amountOfParticipants: game.amountOfParticipants,
    };

    res.send(sanitized);
  });
};
