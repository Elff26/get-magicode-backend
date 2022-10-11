import { Challenge } from "../../database/model/Challenge";

export default interface IChallengeRepository {
    save: (challenge: Challenge) => Promise<Challenge>;
    findChallengeByID:(challengeID: number) => Promise<Challenge | null>;
    findChallengeByTechnology:(challengeID: number) => Promise<Challenge[]>;
}