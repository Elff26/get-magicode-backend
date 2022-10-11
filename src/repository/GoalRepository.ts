import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Goal } from "../database/model/Goal";
import IGoalRepository from "./interface/IGoalRepository";

export default class GoalRepository implements IGoalRepository{
    private goalRepository: Repository<Goal>
    constructor(){
        this.goalRepository = AppDataSource.manager.getRepository(Goal);
    }

    save = async (goal: Goal) => {
        return await this.goalRepository.save(goal);
    }

    listAllGoals = async () => {
        return await this.goalRepository.createQueryBuilder('Goal')
                                        .select("Goal")
                                        .getMany();
    }
}