import * as scoresService from "../../../../api/whist/scores";
import { gameActionTypes } from "../../types";

export function setScores(gameId, amountOfParticipants, participants) {
  return function (dispatch) {
    return scoresService
      .setScores(gameId, amountOfParticipants, participants)
      .then((newScores) => {
        dispatch(setScoresSuccess(newScores));
      });
  };
}

export function setScoresSuccess(scores) {
  return { type: gameActionTypes.SET_SCORES_SUCCESS, scores };
}
