import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Challenge } from "../database/entity/Challenge";
import ChallengeModel from "../model/ChallengeModel";
import IChallengeRepository from "./interface/IChallengeRepository";

export default class ChallengeRepository implements IChallengeRepository {
    private challengeRepository: Repository<Challenge>;
    
    constructor(){
        this.challengeRepository = AppDataSource.manager.getRepository(Challenge);
    }
    findChallengByID: (challengeID: number) => Promise<ChallengeModel | null>;
    save = async (challenge: ChallengeModel) => {
        return await this.challengeRepository.save(challenge); 
    }

    findChallengeByID = async (challengeID: number) => {
        return await this.challengeRepository.findOneBy({challengeID: challengeID});
    }

    findChallengeByTechnology = async (technologyID: number) => {
        return this.challengeRepository.createQueryBuilder('challenge')
                                            .leftJoinAndSelect('challenge.technology', 't')
                                            .leftJoinAndSelect('challenge.classes', 'c')
                                            .where('t.cd_tecnologia = :technologyID', {technologyID})
                                            .getMany();
    }
}