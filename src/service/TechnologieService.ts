import HttpError from "../exceptions/HttpError";
import ITechnologyProperties from "../interfaceType/ITechnologyProperties";
import IUserTechnologyProperties from "../interfaceType/IUserTechnologiesProperties";
import ITechnologyRepository from "../repository/interface/ITechnologieRepository";
import IUserRepository from "../repository/interface/IUserRepository";
import IUserTechnologyRepository from "../repository/interface/IUserTechnologyRepository";


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

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        userExists.technologies.forEach(async (tech) => {
            await this.userTechnologyRepository.delete(tech.userTechnologyID);
        });
        
        userExists.technologies = technologies;
        
        return await this.userRepository.save(userExists);
    }
    
    changeLearningTrail = async (userTechnology: IUserTechnologyProperties) => {
        const userExists = await this.userRepository.findUserById(userTechnology.user.userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
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