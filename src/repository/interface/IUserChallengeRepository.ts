import { UserChallenge } from "../../database/model/UserChallenge";

export default interface IUserChallengeRepository {
    saveOrUpdate: (UserChallenge: UserChallenge) => Promise<UserChallenge>;
    findByUserChallengeByUserAndChallenge:(userID: number, challengeID: number) => Promise<UserChallenge | null>;
    findUserChallengeByTechnology: (userID: number, challengeID: number) => Promise<UserChallenge[]>;
}