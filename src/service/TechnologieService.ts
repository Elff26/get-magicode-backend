import HttpError from "../exceptions/HttpError";
import ITechnologyProperties from "../interfaceType/ITechnologyProperties";
import ITechnologyRepository from "../repository/interface/ITechnologieRepository";
import IUserRepository from "../repository/interface/IUserRepository";


export default class TechnologyService{
    private userRepository: IUserRepository;
    private technologyRepository: ITechnologyRepository

    constructor(userRepository: IUserRepository, technologyRepository: ITechnologyRepository){
        this.userRepository = userRepository;
        this.technologyRepository = technologyRepository
    }

    listAllTechnologies = async () => {
        return await this.technologyRepository.listAllTechnologies();
    }

    createTechnology = async (technology: ITechnologyProperties) => {
        return await this.technologyRepository.save(technology);
    }

    associateUserToTechnology = async (userID: number, technologies: ITechnologyProperties[]) => {
        const userExists = await this.userRepository.findUserById(userID);

        if(!userExists) {
            throw new HttpError('User not found!', 404);
        }

        userExists.technologies = technologies;

        return await this.userRepository.save(userExists);
    }
    
}