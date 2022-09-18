import HttpError from "../exceptions/HttpError";
import IChallengeProperties from "../interfaceType/IChallengeProperties";
import IChallengeRepository from "../repository/interface/IChallengeRepository";

export default class ChallengeService {
    private challengeRepository: IChallengeRepository;
    constructor(challengeRepository: IChallengeRepository) {
        this.challengeRepository = challengeRepository;
    }
    createChallenge = async (challenge: IChallengeProperties) => {
        return await this.challengeRepository.save(challenge);
    }
    findChallengeByID = async (challengeID: number) => {
        const challengeExists = await this.challengeRepository.findChallengeByID(challengeID);
        if (!challengeExists) {
            throw new HttpError('Challenge Not Found !', 404);
        }
        return challengeExists;
    }
}