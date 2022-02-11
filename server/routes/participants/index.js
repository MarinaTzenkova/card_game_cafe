module.exports = (app, db) => {
  app.post("/participants", (req, res) => {
    const id = req.body["id"];
    const players = req.body["players"];

    const participants = Object.keys(players).map((key, index) => ({
      name: players[key],
      id: index,
      hand: [],
    }));

    db.get("participants")
      .assign({ [id]: participants })
      .value();
    db.write();

    res.send(participants);
  });

  app.get("/participants/:id", (req, res) => {
    const id = req.params["id"];
    const particiants = db.get("participants").get(id).value();
    const response = particiants ? particiants : [];
    res.send(response);
  });

  app.put("/participants/:id/:participantId", (req, res) => {
    const id = req.params["id"];
    const participantId = req.params["participantId"];
    const hand = req.body["hand"];

    db.get("participants").get(id).get(participantId).assign({ hand }).value();

    console.log(hand, participantId);

    const participants = db.get("participants").get(id).value();

    res.send(participants);
  });
};
