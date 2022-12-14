import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import ITechnologyProperties from "../interfaceType/ITechnologyProperties";
import IUserTechnologyProperties from "../interfaceType/IUserTechnologiesProperties";
import ITechnologyRepository from "../repository/interface/ITechnologieRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import IUserTechnologyRepository from "../repository/interface/IUserTechnologyRepository";
import TechnologyRepository from "../repository/TechnologieRepository";
import UserRepository from "../repository/UserRepository";
import UserTechnologyRepository from "../repository/UserTechnologyRepository";
import TechnologyService from "../service/TechnologieService";
import Messages from "../utils/Messages";

export default class TechnologyController{
    private userRepository: IUserRepository;
    private technologyRepository: ITechnologyRepository;
    private technologyService: TechnologyService;
    private userTechnologyRepository: IUserTechnologyRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.technologyRepository = new TechnologyRepository();
        this.userTechnologyRepository = new UserTechnologyRepository();
        this.technologyService = new TechnologyService(this.userRepository, this.technologyRepository, this.userTechnologyRepository);
    }

    listAllTechnologies = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.technologyService.listAllTechnologies();
            
            response.status(200).json({ technologies: result });
        } catch(error: any) {
            next(error);
        }
    }

    listAllTechnologiesWithExercise = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.technologyService.listAllTechnologiesWithExercises();
            
            response.status(200).json({ technologies: result });
        } catch(error: any) {
            next(error);
        }
    }

    createTechnology = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const technology: ITechnologyProperties = request.body.technology;

            const result = await this.technologyService.createTechnology(technology);
            
            response.status(200).json({ technology: result });
        } catch(error: any) {
            next(error);
        }
    }
 
    associateUserToTechnology = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const technologies: IUserTechnologyProperties[] = request.body.technologies;
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError(Messages.USER_ID_INCORRECT_TYPE, 403);
            }

            if(technologies.length <= 0) {
                throw new HttpError(Messages.TECHNOLOGY_MINIMUM_NUMBER, 400);
            }

            if(technologies.length > 2) {
                throw new HttpError(Messages.TECHNOLOGY_MAXIMUM_NUMBER, 400);
            }

            const result = await this.technologyService.associateUserToTechnology(userID, technologies);
            
            response.status(200).json({ user: result });
        } catch(error: any) {
            next(error);
        }
    }

    changeTechnology = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userTechnology: IUserTechnologyProperties = request.body.userTechnology;

            const result = await this.technologyService.changeTechnology(userTechnology);
            
            response.status(200).json({ user: result });
        } catch(error: any) {
            next(error);
        }
    }
}
