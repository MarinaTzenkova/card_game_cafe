module.exports = (app, db) => {
  app.get("/game", (_, res) => {
    const game = db.get("game").value();
    res.send(game);
  });

  app.put("/game", (req, res) => {
    const newGame = req.body;
    db.get("game").assign(newGame).value();
    db.write();
    res.send(newGame);
  });
};
