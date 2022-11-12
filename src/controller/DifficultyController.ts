import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import DifficultyService from "../service/DifficultyService";
import IDifficultyRepository from "../repository/interface/IDifficultyRepository";
import DifficultyRepository from "../repository/DifficultyRepository";
import IDifficultyProperties from "../interfaceType/IDifficultyProperties";
import Messages from "../utils/Messages";

export default class DifficultyController{
    private difficultyRepository: IDifficultyRepository
    private difficultyService: DifficultyService

    constructor(){
        this.difficultyRepository = new DifficultyRepository();
        this.difficultyService = new DifficultyService( this.difficultyRepository);
    }

    createDifficulty = async (request: Request, response: Response, next: NextFunction) =>{
        try{
            const difficulty: IDifficultyProperties = request.body.difficulty;
            const result = await this.difficultyService.createDifficulty(difficulty);
            
            response.status(200).json({difficulty: result});
        }catch(error: any){
            next(error);
        }
    }

    findAllDifficulties = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.difficultyService.findAllDifficulties();
    
            response.status(200).json({ difficulties: result });
        }  catch(error: any) {
            next(error)
        }
    }

    findDifficultyById = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const difficultyID = Number(request.params.difficultyID);

            if(isNaN(difficultyID)) {
                throw new HttpError(Messages.DIFFICULTY_ID_INCORRECT_TYPE, 403);
            }
    
            const result = await this.difficultyService.findDifficultyById(Number(request.params.difficultyID));
    
            response.status(200).json({ difficulty: result });
        }  catch(error: any) {
            next(error)
        }
    }
}