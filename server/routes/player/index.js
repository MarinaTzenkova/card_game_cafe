module.exports = (app, db) => {
  app.put("/player", (req, res) => {
    const body = req.body;
    db.get("player").assign(body).value();
    db.write();

    res.send(body);
  });

  app.get("/player", (_, res) => {
    const player = db.get("player").value();
    res.send(player);
  });
};
