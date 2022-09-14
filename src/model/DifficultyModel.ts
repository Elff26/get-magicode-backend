import IDifficultyProperties from "../interfaceType/IDifficultyProperties";

export default class DifficultyModel{
    constructor(difficulty: IDifficultyProperties){
        this.difficultyID = difficulty.difficultyID;
        this.description = difficulty.description;
        this.valueXP = difficulty.valueXP;
    }
    difficultyID: number;
    description: string
    valueXP: string
}