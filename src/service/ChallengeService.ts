import HttpError from "../exceptions/HttpError";
import IChallengeProperties from "../interfaceType/IChallengeProperties";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import ITechnologyRepository from "../repository/interface/ITechnologieRepository";

export default class ChallengeService {
    private challengeRepository: IChallengeRepository;
    private technologyRepository: ITechnologyRepository;

    constructor(challengeRepository: IChallengeRepository, technologyRepository: ITechnologyRepository) {
        this.challengeRepository = challengeRepository;
        this.technologyRepository = technologyRepository;
    }

    createChallenge = async (challenge: IChallengeProperties) => {
        return await this.challengeRepository.save(challenge);
    }

    findChallengeByID = async (challengeID: number) => {
        const challengeExists = await this.challengeRepository.findChallengeByID(challengeID);

        if (!challengeExists) {
            throw new HttpError('Challenge Not Found!', 404);
        }

        return challengeExists;
    }

    findChallengeByTechnology = async (technologyID: number) => {
        const technologyExists = await this.technologyRepository.findByID(technologyID);

        if(!technologyExists) {
            throw new HttpError('Technology Not Found!', 404);
        }

        const challenges = await this.challengeRepository.findChallengeByTechnology(technologyExists.technologyID);

        if(!challenges) {
            throw new HttpError('This technology has no challenges!', 404);
        }

        return challenges;
    }
}