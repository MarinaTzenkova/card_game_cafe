const baseUrl = "http://localhost:3001/participants";

// {
//   name: "",
//   id: 0,
//   // id of card (from deck db) and position on the map
//   hand: [{ id: { suit: null, rank: null }, placed: false }],
// },

export function setParticipants(gameId, players) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: gameId, players }),
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function loadParticipants(id) {
  return fetch(baseUrl + `/${id}`).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function updateHand(gameId, participantId, hand) {
  return fetch(baseUrl + `/${gameId}/${participantId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hand }),
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}
