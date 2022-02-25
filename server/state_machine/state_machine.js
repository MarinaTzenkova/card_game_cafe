const {
  getSeed,
  generatePlayerDeck,
  generateShuffledDeck,
} = require("../seeds");

const DEFAULT_SCORES = [2, 3, 4, 5, 6, 7];

const machine = {
  state: "INIT",
  transitions: {
    INIT: {
      createDeck: async function () {
        let deck = getSeed(this.game.amountOfParticipants);

        this.game._initialDeck = deck;

        const playerDeck = await generatePlayerDeck(this.game._initialDeck);
        this.game.currentDeck = generateShuffledDeck(playerDeck);
        this.generateScoreBoard();
      },
      playerJoin: function (playerId) {
        if (this.game.playerIds.length === this.game.amountOfParticipants) {
          this.changeState("ROUND_INIT");
        } else {
          this.game.playerIds.push(playerId);
          this.game.lastPlayer = playerId;
          if (this.game.playerIds.length === this.game.amountOfParticipants) {
            this.changeState("ROUND_INIT");
          }
        }
      },
    },
    ROUND_INIT: {
      setRoundInit: function (possibleRound, firstPlayer) {
        this.emptyBoard();
        this.game.currentRound = possibleRound;
        this.game.currentPlayer = firstPlayer;
      },
      setCurrentRound: function (possibleRound) {
        this.game.currentRound = possibleRound;
      },
      setCurrentPlayer: function (nextPlayer) {
        // In case this was the last player, set the round to end
        if (nextPlayer === -1) {
          this.changeState("ROUND_END");
        }
        this.game.currentPlayer = nextPlayer;
      },
      deal: function () {
        this.game.playerIds.forEach((player) => {
          const hand = [];
          [...Array(this.game.currentRound)].forEach(() => {
            const card = this.drawCard();
            hand.push(card);
          });
          this.game.hands.push({ playerId: player, currentHand: hand });
        });
      },
      placeScoreBet: function (playerId, bet, round) {},
      placeCard: function (card, playerId) {
        if (this.game.placedCards.length === this.game.amountOfParticipants) {
          console.log("Cannot place anymore cards");
          this.changeState("ROUND_END");
        } else {
          console.log(card, playerId);
          const hand = this.game.hands.find(
            (hand) => hand.playerId === parseInt(playerId)
          );
          this.game.placedCards.push(card);

          // remove card from hand
          hand.currentHand = hand.currentHand.filter((c) => c.id !== card.id);
          // update card in hand
          this.game.hands = this.game.hands.map((c) =>
            c.id === card.id ? card : c
          );
        }
      },
    },
    ROUND_END: {
      takeCard: function (player) {
        this.game.placedCards.forEach((card) => (card.visibility = "hidden"));
        const temp = this.game.placedCards;

        // set taken cards to player that won the round
        this.game.takenCards.push({ currentTaken: temp, playerId: player.id });

        // empty board
        this.game.placedCards = [];
      },
      calculateScore: function () {},
      endRound: function () {
        this.changeState("ROUND_INIT");
      },
    },
  },
  dispatch(actionName, ...payload) {
    const action = this.transitions[this.state][actionName];

    if (action) {
      action.apply(machine, payload);
    } else {
      console.error("Invalid action");
    }
  },
  changeState(newState) {
    this.state = newState;
    this.game.dbState = newState;
  },
  drawCard() {
    const card = this.game.currentDeck[0];
    this.game.currentDeck = this.game.currentDeck.slice(1);
    return card;
  },
  emptyBoard() {
    this.game.hands = [];
    this.game.placedCards = [];
    this.game.takenCards = [];
  },
  generateScoreBoard() {
    const ones = Array(this.game.amountOfParticipants).fill(1);
    const eights = Array(this.game.amountOfParticipants).fill(8);

    const columns = [
      ...ones,
      ...DEFAULT_SCORES,
      ...eights,
      ...DEFAULT_SCORES,
      ...ones,
    ];

    // populate arr for keeping track of all necessary rounds
    this.game.rounds = columns;
  },
};

module.exports = {
  machine,
};
