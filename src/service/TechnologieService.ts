import HttpError from "../exceptions/HttpError";
import ITechnologyProperties from "../interfaceType/ITechnologyProperties";
import IUserProperties from "../interfaceType/IUserProperties";
import IUserTechnologyProperties from "../interfaceType/IUserTechnologiesProperties";
import ITechnologyRepository from "../repository/interface/ITechnologieRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import IUserTechnologyRepository from "../repository/interface/IUserTechnologyRepository";
import Messages from "../utils/Messages";


export default class TechnologyService{
    private userRepository: IUserRepository;
    private technologyRepository: ITechnologyRepository;
    private userTechnologyRepository: IUserTechnologyRepository;

    constructor(userRepository: IUserRepository, technologyRepository: ITechnologyRepository, userTechnologyRepository: IUserTechnologyRepository){
        this.userRepository = userRepository;
        this.technologyRepository = technologyRepository;
        this.userTechnologyRepository = userTechnologyRepository;
    }

    listAllTechnologies = async () => {
        return await this.technologyRepository.listAllTechnologies();
    }

    createTechnology = async (technology: ITechnologyProperties) => {
        return await this.technologyRepository.save(technology);
    }

    associateUserToTechnology = async (userID: number, technologies: IUserTechnologyProperties[]) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists || !userExists.userID) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        if(userExists.technologies) {
            userExists.technologies.forEach(async (tech) => {
                await this.userTechnologyRepository.delete(tech.userTechnologyID);
            });            
        }

        technologies.forEach(async (tech) => {
            let loadedTechnology = await this.technologyRepository.findByID(tech.technology.technologyID);
            
            if(loadedTechnology) {
                tech.technology = loadedTechnology;
            } else {
                throw new HttpError(Messages.TECHNOLOGY_NOT_FOUND, 404);
            }
        })

        technologies[0].learning = true;
        
        userExists.technologies = technologies;

        await this.userRepository.save(userExists);

        return this.userRepository.findUserById(userExists.userID);
    }
    
    changeTechnology = async (userTechnology: IUserTechnologyProperties) => {
        if(!userTechnology.user.userID) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        const userExists = await this.userRepository.findUserById(userTechnology.user.userID);

        if(!userExists) {
            throw new HttpError(Messages.USER_NOT_FOUND, 404);
        }

        if(!userExists.technologies) {
            throw new HttpError(Messages.USER_TECHNOLOGY_ASSOCIATION, 404);
        }

        let updatedTechs = userExists.technologies.map(tech => {
            if(tech.userTechnologyID === userTechnology.userTechnologyID) {
                tech.learning = true;
            } else {
                tech.learning = false;
            }
    
            return tech;
        });

        userExists.technologies = updatedTechs;

        return await this.userRepository.save(userExists);
    }
}