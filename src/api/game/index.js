import { handleResponse } from "../utils";

const baseUrl = "http://localhost:3001/game";

export function startGame(game) {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  }).then((response) => handleResponse(response));
}
