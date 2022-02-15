// deck generated based on the amount of players (it's per game and needs to be destroyed)

// game info ->
// id
// name
// mode
// participants
//  - id,
//  - name
// scores
//  - id
//  - scores (generated dymanically based on the amount of players)
// deck
//  - id
//  - other info

// state for game
// game started
// participants joined
// set current round (id of score)
// cards dealt
// set current player (id of player)
// card played (id of card)
// round finished (calculate scores and update current round)
const games = [];
const game = {
  id: -1,
  name: "",
  mode: "1-8-1", // default mode
  amountOfPlayers: -1,
  // id and name
  participants: [],
  // id and scores (dynamic, based on the amount of people)
  scores: [],
  // cards based on the amount of people
  // each card has id and other info
  deck: [],
};

// per game (uses game id to identify for now)
const states = {};

const players = [];

module.exports = {
  games,
  states,
  players,
};
