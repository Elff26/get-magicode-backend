import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Challenge } from "../database/model/Challenge";
import IChallengeRepository from "./interface/IChallengeRepository";

export default class ChallengeRepository implements IChallengeRepository {
    private challengeRepository: Repository<Challenge>;
    
    constructor(){
        this.challengeRepository = AppDataSource.manager.getRepository(Challenge);
    }

    findChallengeByID = async (challengeID: number) => {
        return await this.challengeRepository.findOneBy({
            challengeID: challengeID
        });
    }

    save = async (challenge: Challenge) => {
        return await this.challengeRepository.save(challenge); 
    }

    findChallengeByTechnology = async (technologyID: number) => {
        return this.challengeRepository.createQueryBuilder('challenge')
                                            .leftJoinAndSelect('challenge.technology', 't')
                                            .leftJoinAndSelect('challenge.classes', 'c')
                                            .where('t.cd_tecnologia = :technologyID', {technologyID})
                                            .getMany();
    }
}