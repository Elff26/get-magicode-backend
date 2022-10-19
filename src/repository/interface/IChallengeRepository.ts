import { Challenge } from "../../database/model/Challenge";

export default interface IChallengeRepository {
    save: (challenge: Challenge) => Promise<Challenge>;
    findChallengeByID:(challengeID: number) => Promise<Challenge | null>;
    findChallengeByTechnologyAndDifficulty:(challengeID: number, difficultyID: number) => Promise<Challenge[]>;
    findChallengesByExercisesIds: (exercisesID: number[]) => Promise<Challenge[]>;
}