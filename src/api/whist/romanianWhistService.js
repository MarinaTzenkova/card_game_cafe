import cards from "../mock/cards";
const baseUrl = "http://localhost:3001/deck";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function fetchCards() {
  return fetch(baseUrl).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function generateDeck(amountOfPlayers) {
  const merged = [
    ...slice(cards.spades, amountOfPlayers),
    ...slice(cards.hearts, amountOfPlayers),
    ...slice(cards.diamonds, amountOfPlayers),
    ...slice(cards.clubs, amountOfPlayers),
  ];

  const shuffled = shuffle(merged);

  const deck = shuffled.map((card, index) => ({ ...card, dealt: false }));
  console.log(JSON.stringify(deck));
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deck),
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function dealCards(amountOfPlayers, currentRound) {
  return fetch(baseUrl).then(async (response) => {
    if (response.ok) {
      const temp = [];
      const deck = await response.json();
      [...Array(currentRound)].forEach(() => {
        [...Array(amountOfPlayers)].forEach((participant, _index) => {
          const reverseIndex = deck.length - 1 - _index;
          const toUpdate = deck[reverseIndex];

          temp.push();
        });
      });
    }
    throw response;
  });
}

function slice(arr, nm) {
  // sort cards from 2 to ace
  const amountToSlice = (52 - nm * 8) / 4;
  return arr.slice(amountToSlice);
}
