import { gameActionTypes } from "../../types";
import * as participantsService from "../../../../api/whist/participants";

export function setParticipants(gameId, participants) {
  return function (dispatch) {
    return participantsService
      .setParticipants(gameId, participants)
      .then((newPlayers) => {
        dispatch(setParticipantsSuccess(newPlayers));
      });
  };
}

export function loadParticipants(gameId) {
  return function (dispatch) {
    return participantsService.loadParticipants(gameId).then((participants) => {
      dispatch(loadParticipantsSuccess(participants));
    });
  };
}

export function updateHand(gameId, participantId, hand) {
  return function (dispatch) {
    return participantsService
      .updateHand(gameId, participantId, hand)
      .then((updatedParticipants) => {
        dispatch(updateHandSuccess(updatedParticipants));
      });
  };
}

export function setParticipantsSuccess(participants) {
  return { type: gameActionTypes.SET_PARTICIPANTS_SUCCESS, participants };
}

export function loadParticipantsSuccess(participants) {
  return { type: gameActionTypes.LOAD_PARTICIPANTS_SUCCESS, participants };
}

export function updateHandSuccess(participants) {
  return { type: gameActionTypes.SET_HAND_SUCCESS, participants };
}
