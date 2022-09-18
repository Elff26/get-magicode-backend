import { Router, Request, Response } from 'express';

import UserController from './controller/UserController';
import AuthController from './controller/AuthController';
import TechnologyController from './controller/TechnologieController';
import GoalController from './controller/GoalController';
import ClassroomController from './controller/ClassroomController';
import ExerciseController from './controller/ExerciseController';
import DifficultyController from './controller/DifficultyController';

const router = Router();

const userController = new UserController();
const authControler = new AuthController();
const technologyController = new TechnologyController();
const goalController = new GoalController();
const classroomController = new ClassroomController();
const exerciseController = new ExerciseController();
const difficultyController = new DifficultyController();

router.post("/CreateUser", userController.createUser);
router.get("/FindUserById/:userID", userController.findUserById);
router.put("/UpdateUser/:userID", userController.updateUser);
router.delete("/DeleteUser/:userID", userController.deleteUSer);
router.post("/Login", authControler.login);
router.put("/CodeAndDateGenerator", userController.insertCodeAndDatePasswordbyUser);
router.post("/VerificationCode/:userID", userController.verificationCode);
router.put("/ChangePassword/:userID", authControler.changePassword);

router.post("/CreateTechnology", technologyController.createTechnology);
router.get("/ListAllTechnologies", technologyController.listAllTechnologies);
router.post("/AssociateToTechnology/:userID", technologyController.associateUserToTechnology);
router.post('/ChangeTechnology', technologyController.changeTechnology);

router.post("/CreateGoal", goalController.createGoal);
router.post("/AssociateToGoal/:userID", goalController.associateUserToGoal);
router.get("/ListAllGoals", goalController.listAllGoals);

router.post("/CreateClassroom", classroomController.createClassroom);
router.get("/FindClassroomById/:classroomID", classroomController.findClassroomById);

router.post("/CreateExercise", exerciseController.createExercise);
router.get("/FindExerciseId/:exerciseID", exerciseController.findExerciseById);

router.post("/CreateDifficulty", difficultyController.createDifficulty);
router.get("/FindDifficultyId/:difficultyID", difficultyController.findDifficultyById);

export default router; 