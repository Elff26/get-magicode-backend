import ChallengeModel from "./ChallengeModel";
import UserModel from "./UserModel";

export default class UserChallengeModel {
    constructor(userChallengeID: number, user: UserModel, challenge: ChallengeModel, completed: boolean) {
        this.userChallengeID = userChallengeID;
        this.user = user;
        this.challenge = challenge;
        this.completed = completed;
    }

    userChallengeID?: number;
    user: UserModel;
    challenge: ChallengeModel;
    completed?: boolean;
}