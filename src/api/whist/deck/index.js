import cards from "../../mock/cards";
import { shuffle, slice } from "../utils";

const baseUrl = "http://localhost:3001/deck";

export function setDeck(id, amountOfPlayers) {
  const merged = [
    ...slice(cards.spades, amountOfPlayers),
    ...slice(cards.hearts, amountOfPlayers),
    ...slice(cards.diamonds, amountOfPlayers),
    ...slice(cards.clubs, amountOfPlayers),
  ];

  const shuffled = shuffle(merged);

  const deck = shuffled.map((card, index) => ({ ...card, dealt: false }));

  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [id]: deck }),
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function loadDeck(id) {
  //`/?q=${id}`
  return fetch(baseUrl).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}
