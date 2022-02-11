const baseUrl = "http://localhost:3001/scores";

export function setScores(gameId, participants) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: gameId, participants }),
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function loadScores(id) {
  return fetch(baseUrl + `/${id}`).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}
