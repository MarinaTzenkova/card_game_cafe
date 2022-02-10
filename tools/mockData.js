// const game = {
//   hasStarted: false,
//   mode: "1-8-1",
//   currentRound: 0,
//   scores: {},
//   deck: [],
//   currentPlayer: 0,
//   participants: [
//     // {
//     //   name: "",
//     //   id: 0,
//     //   // id of card (from deck db) and position on the map
//     //   hand: [{ id: { suit: null, rank: null }, placed: false }],
//     // },
//   ],
// };

const participants = {};
const deck = {};
const scores = {};
const game = {
  id: 0,
  hasStarted: false,
  mode: "1-8-1",
  currentRound: 0,
  currentPlayer: 0,
};

module.exports = {
  game,
  participants,
  deck,
  scores,
};
