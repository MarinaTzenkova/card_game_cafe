const { slice, shuffle } = require("../../utils");
const { cards } = require("../../mock/cards");

module.exports = (app, db) => {
  app.get("/deck/:id", (req, res) => {
    const id = req.params["id"];
    const deck = db.get("deck").get(id).value();
    const response = deck ? deck : [];
    res.send(response);
  });

  app.post("/deck", (req, res) => {
    const id = req.body["id"];
    const players = req.body["players"];
    const amountOfPlayers = Object.keys(players).length;
    const merged = [
      ...slice(cards.spades, amountOfPlayers),
      ...slice(cards.hearts, amountOfPlayers),
      ...slice(cards.diamonds, amountOfPlayers),
      ...slice(cards.clubs, amountOfPlayers),
    ];

    const shuffled = shuffle(merged);

    const deck = shuffled.map((card) => ({ ...card, dealt: false }));

    db.get("deck")
      .assign({ [id]: deck })
      .value();
    db.write();

    res.send(deck);
  });
};
