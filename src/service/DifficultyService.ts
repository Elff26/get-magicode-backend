import HttpError from "../exceptions/HttpError";
import IDifficultyProperties from "../interfaceType/IDifficultyProperties";
import IDifficultyRepository from "../repository/interface/IDifficultyRepository";
import Messages from "../utils/Messages";

export default class DifficultyService{
    private difficultyRepository: IDifficultyRepository;

    constructor(difficultyRepository:IDifficultyRepository){
        this.difficultyRepository = difficultyRepository;
    }

    createDifficulty = async (difficulty: IDifficultyProperties) =>{
        return await this.difficultyRepository.save(difficulty);
    }

    findAllDifficulties = async () => {
        return await this.difficultyRepository.findAllDifficulties();
    }

    findDifficultyById = async (difficultyID: number) => {
        const difficultyExists = await this.difficultyRepository.findDifficultyById(difficultyID);

        if(!difficultyExists) {
            throw new HttpError(Messages.EXERCISE_NOT_FOUND, 404);
        }

        return difficultyExists;
    }
}