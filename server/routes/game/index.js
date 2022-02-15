const { game } = require("../../data");
const gameManager = require("../../managers/gameManager");
const { messageTypes } = require("../../socket/messageTypes");

// POST request for game creation
// emits message on success,
// generated deck and scoreboard

module.exports = (app, db, socket) => {
  app.post("/game", (req, res) => {
    console.log("test");
    const { name, mode, amountOfParticipants } = req.body;
    const id = db.get("games").value().length;
    const newGame = {
      ...game,
      id,
      name,
      mode,
      amountOfParticipants,
      // the player that created the game joins automatically
      joined: 1,
    };

    gameManager.setupInitialDeck(newGame);
    gameManager.shuffleDeck(newGame);

    db.get("games").push(newGame).value();
    db.write();

    // we do not send the full game data for now
    socket.emit(messageTypes.created, {
      nrOfPlayers: newGame.amountOfParticipants,
      joined: newGame.joined,
      name: newGame.name,
      id: newGame.id,
      deck: newGame.currentDeck,
      placed: newGame.placedCards,
      hands: newGame.hands,
      taken: newGame.takenCards,
    });
  });
};
