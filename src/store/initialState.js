export const initialState = {
  game: {
    id: -1,
    name: "",
    mode: "1-8-1",

    currentRound: -1,
    currentPlayer: -1,
    deck: [],

    placed: [],
    taken: [],
    hands: [],
  },
  rooms: [],
  player: { id: -1, name: "", hand: [] },
  players: [],
};
