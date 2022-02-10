export default function prepareGame(game) {
  const newGame = {
    ...game,
    hasStarted: true,
    currentRound: 0,
    currentPlayer: 0,
  };

  return newGame;
}
