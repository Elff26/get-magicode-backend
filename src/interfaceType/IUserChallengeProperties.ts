import { Challenge } from "../database/model/Challenge";
import { User } from "../database/model/User";

export default interface IUserChallengeProperties {
    userChallengeID?: number;
    user: User;
    challenge: Challenge;
    completed?: boolean;
}