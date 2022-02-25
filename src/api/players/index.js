import { handleResponse } from "../utils";

const baseUrl = "http://localhost:3001/player";

export function getPlayer(id, gameId) {
  return fetch(`${baseUrl}/${gameId}/${id}`).then((response) =>
    handleResponse(response)
  );
}

// server returns all players, except current player for game
export function getPlayers(id, gameId) {
  return fetch(`${baseUrl}s/${gameId}/${id}`).then((response) =>
    handleResponse(response)
  );
}
