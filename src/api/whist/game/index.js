const baseUrl = "http://localhost:3001/game";

export function fetchGame() {
  return fetch(baseUrl).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function setGame(game) {
  return fetch(baseUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}
