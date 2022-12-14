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
        return await this.challengeRepository.findOne({
            where: {
                challengeID: challengeID
            },
            order: {
                challengeID: 'ASC',
                classes: {
                    classroomID: 'asc'
                },
                exercises: {
                    exerciseID: 'asc'
                }
            }
        });
    }

    save = async (challenge: Challenge) => {
        return await this.challengeRepository.save(challenge); 
    }

    findChallengeByTechnologyAndDifficulty = async (technologyID: number, difficultyID: number) => {
        return await this.challengeRepository.createQueryBuilder('challenge')
                                            .leftJoinAndSelect('challenge.technology', 't')
                                            .leftJoinAndSelect('challenge.classes', 'c')
                                            .leftJoinAndSelect('challenge.difficulty', 'd')
                                            .where('t.technologyID = :technologyID and d.difficultyID = :difficultyID', {technologyID, difficultyID})
                                            .orderBy('challenge.challengeID', 'ASC')
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