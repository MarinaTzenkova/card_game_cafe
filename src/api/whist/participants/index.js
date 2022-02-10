const baseUrl = "http://localhost:3001/participants";

// {
//   name: "",
//   id: 0,
//   // id of card (from deck db) and position on the map
//   hand: [{ id: { suit: null, rank: null }, placed: false }],
// },

export function setParticipants(gameId, players) {
  const participants = players.map((player, index) => ({
    name: player.name,
    id: index,
    hand: [],
  }));
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [gameId]: participants }),
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function loadParticipants(gameId) {
  return fetch(baseUrl + `/${gameId}`).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}
