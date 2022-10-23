import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import ITipProperties from "../interfaceType/ITipProperties";
import ITipRepository from "../repository/interface/ITipRepository";
import TipRepository from "../repository/TipRepository";
import TipService from "../service/TipService";

export default class TipController {
    private tipService: TipService;
    private tipRepository: ITipRepository;

    constructor(){
        this.tipRepository = new TipRepository();
        this.tipService = new TipService(this.tipRepository);
    }

    createTip = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const tip: ITipProperties = request.body.tip;
            const result = await this.tipService.createTip(tip);
            
            response.status(200).json({ tip: result });

        } catch(error: any) {
            next(error);
        }
    }


    findTipByExercise = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const exerciseID = Number(request.params.exerciseID);

            if(isNaN(exerciseID)) {
                throw new HttpError('ID must be a number', 403);
            }

            const result = await this.tipService.findTipByExercise(exerciseID);
    
            response.status(200).json({ classrooms: result });
        } catch(error: any) {
            next(error);
        }
    }
}