import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Goal } from "../database/entity/Goal";
import GoalModel from "../model/GoalModel";
import IGoalRepository from "./interface/IGoalRepository";

export default class GoalRepository implements IGoalRepository{
    private goalRepository: Repository<Goal>
    constructor(){
        this.goalRepository = AppDataSource.manager.getRepository(Goal);
    }

    save = async (goal: GoalModel) => {
        return await this.goalRepository.save(goal);
    }
}