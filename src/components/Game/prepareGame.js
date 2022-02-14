export default function prepareGame(game, gameName, amountOfParticipants) {
  const newGame = {
    ...game,
    name: gameName,
    hasStarted: true,
    currentRound: 0,
    currentPlayer: 0,
    participants: amountOfParticipants,
  };

  return newGame;
}
