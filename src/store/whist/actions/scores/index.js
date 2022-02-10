import * as scoresService from "../../../../api/whist/scores";
import { gameActionTypes } from "../../types";

export function setScores(gameId, amountOfParticipants, participants) {
  return function (dispatch) {
    return scoresService
      .setScores(gameId, amountOfParticipants, participants)
      .then((newScores) => {
        dispatch(setScoresSuccess(newScores[gameId]));
      });
  };
}

export function loadScores(gameId) {
  return function (dispatch) {
    return scoresService.loadScores(gameId).then((scores) => {
      dispatch(loadScoresSuccess(scores[gameId]));
    });
  };
}

export function loadScoresSuccess(scores) {
  return { type: gameActionTypes.LOAD_SCORES_SUCCESS, scores };
}

export function setScoresSuccess(scores) {
  return { type: gameActionTypes.SET_SCORES_SUCCESS, scores };
}
