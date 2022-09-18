import ChallengeModel from "../../model/ChallengeModel";

export default interface IChallengeRepository {
    save: (challenge: ChallengeModel) => Promise<ChallengeModel>;
    findChallengeByID:(challengeID: number) => Promise<ChallengeModel | null>;
    findChallangeByTechnology:(challengeID: number) => Promise<ChallengeModel[]>;
}