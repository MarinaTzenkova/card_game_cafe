const { shuffle } = require("../utils");
const fs = require("fs");
const path = require("path");

function getSeed(nrOfPeople) {
  return `${nrOfPeople}PlayerDeck.json`;
}

async function generatePlayerDeck(seed) {
  try {
    const fileName = path.join(__dirname, seed);

    const file = await fs.readFileSync(fileName);
    const parsed = JSON.parse(file.toString())["deck"];
    return parsed;
  } catch (error) {
    throw error;
  }
}

function generateShuffledDeck(deck) {
  return shuffle(deck);
}

module.exports = {
  getSeed,
  generatePlayerDeck,
  generateShuffledDeck,
};
