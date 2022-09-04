import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IChangePassProperties from "../interfaceType/IChangePassProperties";
import ILoginProperties from "../interfaceType/ILoginProperties";
import ITechnologyProperties from "../interfaceType/ITechnologyProperties";
import IUserProperties from "../interfaceType/IUserProperties";
import ITechnologyRepository from "../repository/interface/ITechnologieRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import TechnologyRepository from "../repository/TechnologieRepository";
import UserRepository from "../repository/UserRepository";
import AuthService from "../service/AuthService";
import TechnologyService from "../service/TechnologieService";

export default class TechnologyController{
    private userRepository: IUserRepository
    private technologyRepository: ITechnologyRepository
    private technologyService: TechnologyService

    constructor() {
        this.userRepository = new UserRepository();
        this.technologyRepository = new TechnologyRepository();
        this.technologyService = new TechnologyService(this.userRepository, this.technologyRepository);
    }

    listAllTechnologies = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.technologyService.listAllTechnologies();
            
            response.status(200).json({ technologies: result });
        } catch(error: any) {
            next(error);
        }
    }

    createTechnology = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const technology: ITechnologyProperties = request.body.technology;

            const result = await this.technologyService.createTechnology(technology);
            
            response.status(200).json({ user: result });
        } catch(error: any) {
            next(error);
        }
    }
 
    associateUserToTechnology = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const technologies: ITechnologyProperties[] = request.body.technologies;
            const userID = Number(request.params.userID);

            if(isNaN(userID)) {
                throw new HttpError('ID must be a number', 403);
            }

            if(technologies.length <= 0) {
                throw new HttpError('It is necessary to select at least 1 technology', 400);
            }

            if(technologies.length > 2) {
                throw new HttpError('Select a maximum of 2 technologies', 400);
            }

            const result = await this.technologyService.associateUserToTechnology(userID, technologies);
            
            response.status(200).json({ user: result });
        } catch(error: any) {
            next(error);
        }
    }
}
