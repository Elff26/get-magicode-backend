import ExerciseRepository from "../repository/ExerciseRepository";
import IExerciseRepository from "../repository/interface/IExerciseRepository";
import ExerciseService from "../service/ExerciseService";
import { NextFunction, Request, Response } from "express";
import IExerciseProperties from "../interfaceType/IExerciseProperties";

export default class ExerciseController{
    private exerciseRepository: IExerciseRepository
    private exerciseService: ExerciseService

    constructor(){
        this.exerciseRepository = new ExerciseRepository();
        this.exerciseService = new ExerciseService( this.exerciseRepository);
    }

    createClassroom = async (request: Request, response: Response, next: NextFunction) =>{
        try{
            const exercise: IExerciseProperties = request.body.exercise;
            const result = await this.exerciseService.createExercise(exercise);
            
            response.status(200).json({exercise: result});
        }catch(error: any){
            next(error);
        }
    }
}