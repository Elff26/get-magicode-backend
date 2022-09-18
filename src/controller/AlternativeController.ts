import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IAlternativeProperties from "../interfaceType/IAlternativeProperties";
import AlternativeRepository from "../repository/AlternativeRepository";
import ExerciseRepository from "../repository/ExerciseRepository";
import IAlternativeRepository from "../repository/interface/IAlternativeRepository";
import IExerciseRepository from "../repository/interface/IExerciseRepository";
import AlternativeService from "../service/AlternativeService";

export default class AlternativeController {
    private alternativeRepository: IAlternativeRepository;
    private exerciseRepository: IExerciseRepository;
    private alternativeService: AlternativeService;

    constructor(){
        this.alternativeRepository = new AlternativeRepository();
        this.exerciseRepository = new ExerciseRepository();
        this.alternativeService = new AlternativeService(this.alternativeRepository, this.exerciseRepository);
    }

    createAlternative = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const alternative: IAlternativeProperties = request.body.alternative;

            if(!alternative) {
                throw new HttpError("Alternative is required!", 400)
            }

            const result = await this.alternativeService.createAlternative(alternative);

            response.status(200).json({alternative: result});
        } catch(error: any){
            next(error);
        }
    }   

    findAlternativeByID = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const alternativeID = Number(request.params.alternativeID);

            if (isNaN(alternativeID)){
                throw new HttpError('Alternative ID must be a number !', 403);
            }
            const result = await this.alternativeService.findAlternativeByID(alternativeID);

            response.status(200).json({alternative: result});

        } catch(error: any){
            next(error);
        }
    }

    findAlternativeByExercise = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const exerciseID = Number(request.params.exerciseID);

            if (isNaN(exerciseID)){
                throw new HttpError('Exercise ID must be a number !', 403);
            }
            const result = await this.alternativeService.findAlternativeByExercise(exerciseID);

            response.status(200).json({alternative: result});

        } catch(error: any){
            next(error);
        }
    }
}