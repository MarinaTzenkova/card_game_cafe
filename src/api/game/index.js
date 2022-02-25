import { handleResponse } from "../utils";

const baseUrl = "http://localhost:3001/game";

export function getGame(id) {
  return fetch(`${baseUrl}/${id}`).then((response) => handleResponse(response));
}

export function getGames() {
  return fetch(`${baseUrl}s`).then((response) => handleResponse(response));
}
