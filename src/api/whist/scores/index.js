const baseUrl = "http://localhost:3001/scores";
const DEFAULT_SCORES = [2, 3, 4, 5, 6, 7];

export function setScores(gameId, amountOfParticipants, participants) {
  const columns = generateColumns(amountOfParticipants);
  const scores = {};
  Object.keys(participants).forEach((_, _index) => {
    scores[_index] = columns.map((col) => ({
      column: col,
      called: null,
      score: 0,
    }));
  });
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [gameId]: scores }),
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function loadScores() {
  return fetch(baseUrl).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
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
