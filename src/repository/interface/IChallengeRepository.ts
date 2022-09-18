import ChallengeModel from "../../model/ChallengeModel";

export default interface IChallengeRepository {
    save: (challenge: ChallengeModel) => Promise<ChallengeModel>;
    findChallengeByID:(challengeID: number) => Promise<ChallengeModel | null>;
    findChallengeByTechnology:(challengeID: number) => Promise<ChallengeModel[]>;
}