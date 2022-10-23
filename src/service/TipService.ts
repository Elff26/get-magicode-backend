import ITipProperties from "../interfaceType/ITipProperties";
import ITipRepository from "../repository/interface/ITipRepository";

export default class TipService {
    private tipRepository: ITipRepository;

    constructor(tipRepository: ITipRepository){
        this.tipRepository = tipRepository;
    }

    createTip = async (tip: ITipProperties) => {
        return await this.tipRepository.save(tip);
    }

    findTipByExercise = async (exerciseID: number) => {
        return await this.tipRepository.findTipByExercise(exerciseID);
    }
}