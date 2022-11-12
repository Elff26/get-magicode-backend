import HttpError from "../exceptions/HttpError";
import IGoalProperties from "../interfaceType/IGoalProperties";
import IGoalRepository from "../repository/interface/IGoalRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import Messages from "../utils/Messages";

export default class GoalService{
    private goalRepository: IGoalRepository;
    private userRepository: IUserRepository;

    constructor(goalRepository: IGoalRepository, userRepository: IUserRepository){
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    createGoal = async (goal: IGoalProperties) => {
        return await this.goalRepository.save(goal);
    }

    associateUserToGoal = async (userID: number, goal: IGoalProperties) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        userExists.goal = goal

        return await this.userRepository.save(userExists);
    }

    listAllGoals = async () => {
        return await this.goalRepository.listAllGoals();
    }

    
    getGoalByUser = async (userID: number) => {
        const userExists = await this.userRepository.findUserById(userID);
        
        if(!userExists) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const result = await this.goalRepository.getGoalByUser(userID);

        return result;
    }
}