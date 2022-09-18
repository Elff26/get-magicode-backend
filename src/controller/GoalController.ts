import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IGoalProperties from "../interfaceType/IGoalProperties"
import GoalRepository from "../repository/GoalRepository";
import IGoalRepository from "../repository/interface/IGoalRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import UserRepository from "../repository/UserRepository";
import GoalService from "../service/GoalService";

export default class GoalController {
    private goalService: GoalService;
    private goalRepository: IGoalRepository;
    private userRepository: IUserRepository;

    constructor(){
        this.goalRepository = new GoalRepository();
        this.userRepository = new UserRepository();
        this.goalService = new GoalService(this.goalRepository,this.userRepository)
    }

    createGoal = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const goal: IGoalProperties = request.body.goal;

            const result = await this.goalService.createGoal(goal);
            
            response.status(200).json({ user: result });
        } catch(error: any) {
            next(error);
        }
    }

    associateUserToGoal = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const goal: IGoalProperties = request.body.goal;
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError('ID must be a number', 403);
            }

            const result = await this.goalService.associateUserToGoal(userID, goal);
            
            response.status(200).json({ user: result });
        } catch(error: any) {
            next(error);
        }
    }

    listAllGoals = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.goalService.listAllGoals();
            
            response.status(200).json({ goals: result });
        } catch(error: any) {
            next(error);
        }
    }
}