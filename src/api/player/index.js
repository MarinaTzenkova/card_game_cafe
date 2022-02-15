import { handleResponse } from "../utils";

const baseUrl = "http://localhost:3001/player";

export function loginPlayer(name) {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(name),
  }).then((response) => handleResponse(response));
}
