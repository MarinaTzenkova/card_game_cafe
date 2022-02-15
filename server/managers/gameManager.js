const { generatePlayerDeck, generateShuffledDeck } = require("../seeds");

const gameManager = {
  setupInitialDeck: function (game) {
    let deck = generatePlayerDeck(game.amountOfParticipants);

    console.log(deck);
    game._initialDeck = deck;
  },
  shuffleDeck: function (game) {
    game.currentDeck = generateShuffledDeck(game._initialDeck);
  },
  placeCard: function (game, card, index, hand) {
    card.visibility = "visible";
    game.placedCards.push(card);

    // remove card from hand
    hand.currentHand = hand.currentHand.filter((c) => c.id !== card.id);
    game.hands[index] = hand;
  },
  takeCards: function (game, playerId) {
    game.placedCards.forEach((card) => (card.visibility = "hidden"));
    const temp = game.placedCards;

    // set taken cards to player that won the round
    game.takenCards.push({ currentTaken: temp, playerId });

    // empty board
    game.placedCards = [];
  },
  dealCards: function (game, players, currentRound) {
    players.forEach((player) => {
      const hand = [];
      [...Array(currentRound)].forEach(() => {
        const card = this.drawCard(game);
        hand.push(card);
      });
      game.hands.push({ playerId: player.id, currentHand: hand });
    });
  },
  drawCard: function (game) {
    const card = game.currentDeck[0];
    game.currentDeck = game.currentDeck.slice(1);
    return card;
  },
  emptyBoard: function (game) {
    game.hands = [];
    game.placedCards = [];
    game.takenCards = [];
  },
  moveToNextRound: function (game, possibleRound) {
    this.emptyBoard(game);
    game.currentRound = possibleRound;

    // move back to the initial player (IMPORTANT: this assumes that currently there is only one game that has a list of players linked to it)
    game.currentPlayer = 0;
  },
  moveToNextPlayer: function (game, possibleRound) {
    if (game.placedCards.length !== 0) {
      // ensure that the winner of the placed cards has taken them
    }
    const total = game.amountOfParticipants;
    game.currentPlayer =
      total < game.currentPlayer + 1
        ? this.moveToNextRound(game, possibleRound)
        : game.currentPlayer + 1;
  },
};

module.exports = gameManager;
