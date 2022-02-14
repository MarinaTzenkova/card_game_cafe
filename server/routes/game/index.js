module.exports = (app, db, socket) => {
  app.get("/game", (_, res) => {
    const game = db.get("game").value();
    res.send(game);
  });

  app.put("/game", (req, res) => {
    const newGame = req.body;
    db.get("game").assign(newGame).value();
    db.write();
    // Optimistically adding the creator of the session to have joined the game
    socket.emit("GAME_STARTED", {
      nrOfPlayers: newGame.participants,
      joined: 0,
    });
    res.send(newGame);
  });
};
