import UserChallengeModel from "../../model/UserChallengeModel";

export default interface IUserChallengeRepository {
    saveOrUpdate: (UserChallenge: UserChallengeModel) => Promise<UserChallengeModel>;
    findByUserChallengeByUserAndChallenge:(userID: number, challengeID: number) => Promise<UserChallengeModel | null>;
    findUserChallengeByTechnology: (userID: number, challengeID: number) => Promise<UserChallengeModel[]>;
}