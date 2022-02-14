// eslint-disable-next-line import/no-anonymous-default-export
export default {
  game: {
    id: 0,
    hasStarted: false,
    mode: "1-8-1",
    currentRound: 0,
    currentPlayer: 0,
  },
  participants: [],
  deck: [],
  scores: {},
  player: {
    name: "",
    id: -1,
  },
  state: {
    gameStarted: false,
    allPlayersJoined: false,
  },
};
