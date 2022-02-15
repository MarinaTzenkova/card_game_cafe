import { handleResponse } from "../utils";

const baseUrl = "http://localhost:3001/game";

export function startGame(game) {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  }).then((response) => handleResponse(response));
}

export function getGame(id) {
  return fetch(`${baseUrl}/${id}`).then((response) => handleResponse(response));
}
