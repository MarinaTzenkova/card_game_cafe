const DEFAULT_SCORES = [2, 3, 4, 5, 6, 7];

function generateColumns(players) {
  const ones = Array(players).fill(1);
  const eights = Array(players).fill(8);

  const columns = [
    ...ones,
    ...DEFAULT_SCORES,
    ...eights,
    ...DEFAULT_SCORES,
    ...ones,
  ];

  return columns;
}

module.exports = (app, db, socket) => {
  app.get("/scores/:id", (req, res) => {
    const id = req.params["id"];
    const scores = db.get("scores").get(id).value();

    res.send(scores);
  });

  app.post("/scores", (req, res) => {
    const id = req.body["id"];
    const participants = req.body["participants"];

    const columns = generateColumns(participants.length);
    const scores = {};
    Object.keys(participants).forEach((_, _index) => {
      scores[_index] = columns.map((col) => ({
        column: col,
        called: null,
        score: 0,
      }));
    });

    db.get("scores")
      .assign({ [id]: scores })
      .value();
    db.write();

    res.send(scores);
  });
};
