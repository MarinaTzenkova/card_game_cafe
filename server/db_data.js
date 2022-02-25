const game = {
  id: -1,
  name: "",
  mode: "1-8-1",
  amountOfParticipants: -1,
  dbState: undefined,
  playerIds: [],
  lastPlayer: -1,

  currentRound: -1,
  currentPlayer: -1,

  _initialDeck: [],
  currentDeck: [],

  // these three have a reference to the player id
  placedCards: [],
  takenCards: [],
  hands: [],
};

const hand = {
  playerId: -1,
  currentHand: [],
};

const taken = {
  playerId: -1,
  currentTaken: [],
};

const player = {
  id: -1,
  name: "",
  currentActiveGame: -1,
};

const card = {
  suit: undefined,
  rank: undefined,
  id: -1,
  visibility: "hidden",
};

const games = [];
const players = [];

module.exports = {
  game,
  hand,
  player,
  players,
  games,
  card,
  taken,
};
