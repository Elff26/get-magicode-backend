import ChallengeModel from "../../model/ChallengeModel";
import UserChallengeModel from "../../model/UserChallengeModel";

export default interface IChallengeRepository {
    save: (challenge: ChallengeModel) => Promise<ChallengeModel>;
    findChallengeByID:(challengeID: number) => Promise<ChallengeModel | null>;
    findChallengeByTechnology:(challengeID: number) => Promise<ChallengeModel[]>;
}