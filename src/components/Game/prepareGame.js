const DEFAULT_SCORES = [2, 3, 4, 5, 6, 7];

export default function prepareGame(game, players, participants) {
  const columns = generateColumns(players);
  const scores = {};
  Object.keys(participants).forEach((key, _index) => {
    scores[_index] = columns.map((col) => ({
      column: col,
      called: null,
      score: 0,
    }));
  });

  const newGame = {
    ...game,
    amountOfParticipants: players,
    participants,
    hasStarted: true,
    scores,
    columns,
    currentRound: 0,
  };

  return newGame;
}

function generateColumns(players) {
  const ones = Array(players).fill(1);
  const eights = Array(players).fill(8);

  const columns = [
    ...ones,
    ...DEFAULT_SCORES,
    ...eights,
    ...DEFAULT_SCORES,
    ...ones,
  ];

  return columns;
}
