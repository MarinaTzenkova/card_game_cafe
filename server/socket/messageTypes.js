const states = {
  created: "GAME_CREATED",
  started: "GAME_START",
  joined: "PARTICIPANT_JOINED",
  full: "GAME_FULL",
  roundStarted: "ROUND_START",
  deal: "DEAL_CARDS",
  // curentPlayer: "CURRENT_PLAYER",
  // CARD_PLAYER: "CARD_PLAYER",
  // ROUND_END: "ROUND_END",
  // SCORE_UPDATED: "SCORE_UPDATED",
  // GAME_END: "GAME_END",
};

const gameState = "GAME_STATE";
const playerState = "PLAYER_STATE";

module.exports = {
  states,
  gameState,
  playerState,
};
