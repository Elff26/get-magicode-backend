import { In, Repository } from "typeorm";
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
        return await this.challengeRepository.createQueryBuilder('challenge')
                                            .leftJoinAndSelect('challenge.technology', 't')
                                            .leftJoinAndSelect('challenge.classes', 'c')
                                            .where('t.cd_tecnologia = :technologyID', {technologyID})
                                            .getMany();
    }

    findChallengesByExercisesIds = async (exercisesID: number[]) => {
        return await this.challengeRepository.createQueryBuilder("Challenge")
                                                .leftJoinAndSelect("Challenge.exercises", "e")
                                                .leftJoinAndSelect("Challenge.difficulty", "d")
                                                .leftJoinAndSelect("e.alternatives", "a")
                                                .select(["Challenge.challengeID", "e", "d", "a"])
                                                .where("e.exerciseID IN (:...ids)", {ids: exercisesID})
                                                .getMany();
    }
}