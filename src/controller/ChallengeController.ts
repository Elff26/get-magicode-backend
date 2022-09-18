import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import IChallengeProperties from "../interfaceType/IChallengeProperties";
import ChallengeRepository from "../repository/ChallengeRepository";
import IChallengeRepository from "../repository/interface/IChallengeRepository";
import ChallengeService from "../service/ChallengeService";

export default class ChallengeController {
    private challengeRepository: IChallengeRepository;
    private challengeService: ChallengeService;
    constructor(){
        this.challengeRepository = new ChallengeRepository();
        this.challengeService = new ChallengeService(this.challengeRepository);
    }
    createChallenge = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const challenge: IChallengeProperties = request.body.challenge;
            const result = await this.challengeService.createChallenge(challenge);
            
            response.status(200).json({challenge: result});
        }catch(error: any){
            next(error);
        }
    }
    findChallengeByID = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const challengeID = Number(request.params.challengeID);
            if (isNaN(challengeID)){
                throw new HttpError('ID must be a number !', 403);
            }
            const result = await this.challengeService.findChallengeByID(Number(request.params.challengeID));

            response.status(200).json({challenge: result});

        }catch(error: any){
            next(error);
        }
    }
}