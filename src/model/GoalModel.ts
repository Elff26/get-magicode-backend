import IGoalProperties from "../interfaceType/IGoalProperties"

export default class GoalModel{
    constructor(goal: IGoalProperties){
        this.goalID = goal.goalID;
        this.name = goal.name;
    }
    goalID: number
    name: string
}