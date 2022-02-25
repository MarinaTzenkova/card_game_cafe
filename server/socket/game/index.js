const { game } = require("../../db_data");
const { machine } = require("../../state_machine/state_machine");

module.exports = (gameService, playerService, socket, io) => {
  socket.on("ADD_NEW_GAME", (body) => {
    console.log("Adding new game");
    const { name, mode, amountOfParticipants } = body;
    const id = gameService.getGames().length;

    const newGame = {
      ...game,
      id,
      name,
      mode,
      amountOfParticipants,
      dbState: "INIT",
    };

    const state_machine = Object.assign(machine, { game: newGame });
    state_machine.changeState("INIT");
    state_machine.dispatch("createDeck");

    gameService.addGame(state_machine.game);

    socket.to("game_cafe").emit("NEW_GAME");
  });

  socket.on("PLAYER_JOIN", (body) => {
    console.log("Joining game", body);
    const { gameId, name } = body;
    const game = gameService.getGame(gameId);

    const state_machine = Object.assign(machine, { game });
    const id = playerService.getPlayers().length;
    state_machine.changeState(game.dbState);
    state_machine.dispatch("playerJoin", id);
    playerService.addPlayer({ id, name });

    if (state_machine.state === "ROUND_INIT") {
      socket.to("game_cafe").emit("GAME_FULL", gameId);

      const players = playerService.getPlayers();

      state_machine.dispatch("setRoundInit", 1, players[0].id);
      state_machine.dispatch("deal", players);
      socket.to(`game-${gameId}`).emit("GAME_STARTING", gameId);
    } else {
      socket.to("game_cafe").emit("UPDATE_GAMES");
    }

    io.to(socket.id).emit("PLAYER_ID", id);
    gameService.updateGame(gameId, state_machine.game);
  });

  socket.on("PLAY_CARD", (body) => {
    console.log("Placing card");
    let { gameId, playerId, card } = body;

    playerId = parseInt(playerId);

    const game = gameService.getGame(gameId);

    const state_machine = Object.assign(machine, { game });
    state_machine.changeState(game.dbState);
    state_machine.dispatch("placeCard", card, playerId);

    function getNext() {
      const index = game.playerIds.indexOf(playerId);

      if (index >= 0 && index < game.playerIds.length - 1)
        return game.playerIds[index + 1];
      else {
        return -1;
      }
    }

    const nextPlayer = getNext();
    console.log("setting next player " + nextPlayer);
    if (nextPlayer !== -1) {
      state_machine.dispatch("setCurrentPlayer", nextPlayer);
      socket.to(`game-${gameId}`).emit("CARD_PLAYED", gameId);
    } else {
      socket.to(`game-${gameId}`).emit("ROUND_FINISHED", gameId);
    }

    gameService.updateGame(gameId, state_machine.game);
  });
};
