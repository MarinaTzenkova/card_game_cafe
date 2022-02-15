const { cards } = require("../mock/cards");
const { slice, shuffle } = require("../utils");

function generatePlayerDeck(nrOfPeople) {
  const deck = [
    ...slice(cards.spades, nrOfPeople),
    ...slice(cards.hearts, nrOfPeople),
    ...slice(cards.diamonds, nrOfPeople),
    ...slice(cards.clubs, nrOfPeople),
  ];

  return deck;
}

function generateShuffledDeck(deck) {
  return shuffle(deck);
}

module.exports = {
  generatePlayerDeck,
  generateShuffledDeck,
};
