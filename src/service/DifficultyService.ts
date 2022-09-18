import HttpError from "../exceptions/HttpError";
import IDifficultyProperties from "../interfaceType/IDifficultyProperties";
import IDifficultyRepository from "../repository/interface/IDifficultyRepository";

export default class DifficultyService{
    private difficultyRepository: IDifficultyRepository;

    constructor(difficultyRepository:IDifficultyRepository){
        this.difficultyRepository = difficultyRepository;
    }

    createDifficulty = async (difficulty: IDifficultyProperties) =>{
        return await this.difficultyRepository.save(difficulty);
    }

    findDifficultyById = async (difficultyID: number) => {
        const difficultyExists = await this.difficultyRepository.findDifficultyById(difficultyID);

        if(!difficultyExists) {
            throw new HttpError('Exercise not found!', 404);
        }

        return difficultyExists;
    }
}