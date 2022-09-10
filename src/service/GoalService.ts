import HttpError from "../exceptions/HttpError";
import IGoalProperties from "../interfaceType/IGoalProperties";
import IGoalRepository from "../repository/interface/IGoalRepository";
import IUserRepository from "../repository/interface/IUserRepository";

export default class GoalService{
    private goalRepository: IGoalRepository;
    private userRepository: IUserRepository;

    constructor(goalRepository: IGoalRepository, userRepository: IUserRepository){
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    createGoal = async (goal: IGoalProperties) => {
        console.log(goal)
        return await this.goalRepository.save(goal);
    }

    associateUserToGoal = async (userID: number, goal: IGoalProperties) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        console.log("UserExists",userExists.goal)
        console.log(goal.goalID)

        userExists.goal = goal;

        return await this.userRepository.save(userExists);
    }
}