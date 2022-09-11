import { Router, Request, Response } from 'express';

import UserController from './controller/UserController';
import AuthController from './controller/AuthController';
import TechnologyController from './controller/TechnologieController';
import GoalController from './controller/GoalController';
import ClasseController from './controller/ClassroomController';
import ClassroomController from './controller/ClassroomController';

const router = Router();

const userController = new UserController();
const authControler = new AuthController();
const technologyController = new TechnologyController();
const goalController = new GoalController();
const classroomController = new ClassroomController();

router.get("/FindUserById/:userID", userController.findUserById);
router.post("/CreateUser", userController.createUser);
router.put("/UpdateUser/:userID", userController.updateUser);
router.delete("/DeleteUser/:userID", userController.deleteUSer);
router.put("/CodeAndDateGenerator", userController.insertCodeAndDatePasswordbyUser);
router.post("/VerificationCode/:userID", userController.verificationCode);

router.post("/Login", authControler.login);
router.put("/ChangePassword/:userID", authControler.changePassword);

router.post("/CreateTechnology", technologyController.createTechnology);
router.post("/AssociateToTechnology/:userID", technologyController.associateUserToTechnology);
router.get("/ListAllTechnologies", technologyController.listAllTechnologies);
router.post('/ChangeLearningTrail', technologyController.changeLearningTrail);

router.post("/CreateGoal", goalController.createGoal);
router.post("/AssociateToGoal/:userID", goalController.associateUserToGoal);

router.post("/CreateClassroom", classroomController.createClassroom);
router.get("/FindClassroomById/:classroomID", classroomController.findClassroomById);

export default router; 