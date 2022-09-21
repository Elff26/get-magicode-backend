import ChallengeModel from "../model/ChallengeModel";
import UserModel from "../model/UserModel";

export default interface IUserChallengeProperties {
    userChallengeID?: number;
    user: UserModel;
    challenge: ChallengeModel;
    completed?: boolean;
}