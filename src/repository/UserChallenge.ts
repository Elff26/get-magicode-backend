import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import IUserChallengeRepository from "./interface/IUserChallengeRepository";
import { UserChallenge } from "../database/model/UserChallenge";

export default class UserChallengeRepository implements IUserChallengeRepository {
    private userChallengeRepository: Repository<UserChallenge>;

    constructor(){
        this.userChallengeRepository = AppDataSource.manager.getRepository(UserChallenge);
    }

    saveOrUpdate = (userChallenge: UserChallenge) => {
        return this.userChallengeRepository.save(userChallenge);
    };

    findUserChallengeByTechnology = async (userID: number, technologyID: number) => {
        return await this.userChallengeRepository.createQueryBuilder('user_challenge')
                                            .leftJoinAndSelect('user_challenge.user', 'u')
                                            .leftJoinAndSelect('u.technologies', 'ut')
                                            .leftJoinAndSelect('ut.technology', 't')
                                            .leftJoinAndSelect('user_challenge.challenge', 'c')
                                            .where('t.cd_tecnologia = :technologyID', { technologyID })
                                            .andWhere('u.cd_usuario = :userID', { userID })
                                            .andWhere('c.technology = :technologyID', { technologyID })
                                            .getMany();
    }

    findByUserChallengeByUserAndChallenge = async (userID: number, challengeID: number) => {
        return await this.userChallengeRepository.findOne({
            where: {
                user: {
                    userID: userID
                },
                challenge: {
                    challengeID: challengeID
                }
            }
        })
    }
}
