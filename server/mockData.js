const participants = {};
const deck = {};
const scores = {};
const player = {
  name: "",
  id: -1,
};
const game = {
  id: 0,
  hasStarted: false,
  mode: "1-8-1",
  currentRound: 0,
  currentPlayer: 0,
};

// {id: [{playerId, cardId}]}
const board = {};

module.exports = {
  game,
  participants,
  deck,
  scores,
  player,
  board,
};
