import IExerciseProperties from "../IExerciseProperties";

export default interface IServerToClientEventsProperties {
  roomNumber: (roomNumber: string) => void;
  initChallenge: (roomNumber: string) => void;
  roomNotExists: () => void;
  randomizedExercises: (exercise: IExerciseProperties[], usersID: number[]) => void;
  opponentAnswer: (opponentAnswer: boolean) => void;
  goToNextQuestion: () => void;
  challengeFinished: () => void;
  opponentWantsRematch: () => void;
  rematchAccepted: () => void;
}