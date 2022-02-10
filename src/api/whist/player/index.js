const baseUrl = "http://localhost:3001/player";

export function setPlayer(name, id) {
  return fetch(baseUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name }),
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function loadPlayer() {
  return fetch(baseUrl).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}
