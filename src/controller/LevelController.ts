import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import ILevelProperties from "../interfaceType/ILevelProperties";
import ILevelRepository from "../repository/interface/ILevelRepository";
import LevelRepository from "../repository/LevelRepository";
import LevelService from "../service/LevelService";

export default class LevelController {
    private levelService: LevelService;
    private levelRepository: ILevelRepository;

    constructor(){
        this.levelRepository = new LevelRepository();
        this.levelService = new LevelService(this.levelRepository)
    }

    createLevel = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const level: ILevelProperties = request.body.level;

            if(!level.levelNumber || !level.valueXp) {
                throw new HttpError('Level number and xp value is required', 400); 
            }

            const result = await this.levelService.createLevel(level);
            
            response.status(200).json({ level: result });
        } catch(error: any) {
            next(error);
        }
    }

    listAllLevels = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.levelService.listAllLevels();
            
            response.status(200).json({ levels: result });
        } catch(error: any) {
            next(error);
        }
    }

    findLevelById = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const levelID = Number(request.params.levelID);

            if(isNaN(levelID)) {
                throw new HttpError('ID must be a number', 403);
            }

            const result = await this.levelService.findLevelById(levelID);
            
            response.status(200).json({ level: result });
        } catch(error: any) {
            next(error);
        }
    }
}