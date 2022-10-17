interface IClientToServerEventsProperties {
    play: (userID: number) => void;
    answered: (roomNumber: string, isCorrect: boolean) => void;
    acceptChallenge: (roomNumber: string, userID: number) => void;
    randomizeExercises: (roomNumber: string) => void;
    nextQuestion: (roomNumber: string) => void;
    allUsersFinished: (roomNumber: string) => void;
    exitRoom: (roomNumber: string) => void;
    rematch: (roomNumber: string) => void;
    acceptRematch: (roomNumber: string) => void;
}