import { Technology } from "../../database/model/Technology";
import IChallengeProperties from "../IChallengeProperties";

export default interface IServerToClientEventsProperties {
  roomNumber: (roomNumber: string) => void;
  initChallenge: (roomNumber: string) => void;
  roomNotExists: () => void;
  randomizedExercises: (exercise: IChallengeProperties[], usersID: number[], technology: Technology) => void;
  opponentAnswer: (opponentAnswer: boolean) => void;
  goToNextQuestion: () => void;
  resetNextQuestion: () => void;
  challengeFinished: () => void;
  opponentWantsRematch: () => void;
  rematchAccepted: () => void;
}