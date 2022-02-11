const baseUrl = "http://localhost:3001/deck";

export function setDeck(id, players) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, players }),
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function loadDeck(id) {
  return fetch(baseUrl + `/${id}`).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}
