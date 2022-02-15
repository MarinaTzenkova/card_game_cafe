const { game } = require("../../data");
const gameManager = require("../../managers/gameManager");
const { states } = require("../../socket/messageTypes");

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
      state: states.created,
    };

    gameManager.setupInitialDeck(newGame);
    gameManager.shuffleDeck(newGame);

    db.get("games").push(newGame).value();
    db.write();

    res.send(id);

    socket.to("game_cafe").emit("NEW_GAME", {
      id,
      name,
    });
  });

  app.get("/game/:id", (req, res) => {
    const id = req.params["id"];
    const game = db.get("games").get(id).value();

    const sanitizedDeck = game.currentDeck.map((card) => ({
      suit: card.suit,
      rank: card.rank,
      placed: game.placedCards.includes(card),
      dealtTo: game.hands.find((hand) => hand.currentHand.includes(card))
        ?.playerId,
      takenBy: game.takenCards.find((taken) =>
        taken.currentTaken.includes(card)
      )?.playerId,
    }));

    res.send({
      nrOfPlayers: game.amountOfParticipants,
      joined: game.joined,
      name: game.name,
      id: game.id,
      deck: sanitizedDeck,
      state: game.state,
    });
  });
};

// we do not send the full game data for now
// socket.to("game_cafe").emit(gameState, {
//   nrOfPlayers: newGame.amountOfParticipants,
//   joined: newGame.joined,
//   name: newGame.name,
//   id: newGame.id,
//   deck: newGame.currentDeck,
//   placed: newGame.placedCards,
//   hands: newGame.hands,
//   taken: newGame.takenCards,
//   state: newGame.state,
// });
