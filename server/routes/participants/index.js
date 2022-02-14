module.exports = (app, db, socket) => {
  app.post("/participants", (req, res) => {
    const id = req.body["id"];
    // const players = req.body["players"];

    // const participants = Object.keys(players).map((key, index) => ({
    //   name: players[key],
    //   id: index,
    //   hand: [],
    // }));

    db.get("participants")
      .assign({ [id]: [] })
      .value();
    db.write();

    res.send([]);
  });

  // joining game
  app.put("/participants/:id", (req, res) => {
    const id = req.body["id"];
    const name = req.body["name"];

    const participants = db.get("participants").get(id).value();
    const index = participants.length;

    const newParticipant = {
      name,
      id: index,
      hand: [],
    };

    db.get("participants").get(id).push(newParticipant).value();
    db.write();

    // TODO: in the future, handle socket connection only per game
    socket.emit("PARTICIPANT_JOINED", { gameId: id });
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
