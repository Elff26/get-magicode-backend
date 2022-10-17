import { Router } from 'express';

import UserController from './controller/UserController';
import AuthController from './controller/AuthController';
import TechnologyController from './controller/TechnologieController';
import GoalController from './controller/GoalController';
import ClassroomController from './controller/ClassroomController';
import ExerciseController from './controller/ExerciseController';
import DifficultyController from './controller/DifficultyController';
import ChallengeController from './controller/ChallengeController';
import AlternativeController from './controller/AlternativeController';
import StatisticsController from './controller/StatisticsController';
import GoogleController from './controller/GoogleController';
import FacebookController from './controller/FacebookController';
import LevelController from './controller/LevelController';
import AchievementController from './controller/AchievementController';

const router = Router();

const userController = new UserController();
const authControler = new AuthController();
const technologyController = new TechnologyController();
const goalController = new GoalController();
const classroomController = new ClassroomController();
const exerciseController = new ExerciseController();
const difficultyController = new DifficultyController();
const challengeController = new ChallengeController();
const alternativeController = new AlternativeController();
const statisticsController = new StatisticsController();
const googleController = new GoogleController();
const facebookController = new FacebookController();
const levelController = new LevelController();
const achievementController = new AchievementController();

router.post("/CreateUser", userController.createUser);
router.get("/FindUserById/:userID", userController.findUserById);
router.put("/UpdateUser/:userID", userController.updateUser);
router.delete("/DeleteUser/:userID", userController.deleteUSer);
router.put("/CodeAndDateGenerator", userController.insertCodeAndDatePasswordbyUser);
router.post("/VerificationCode/:userID", userController.verificationCode);
router.put("/DecreaseNumberOfLifes/:userID", userController.decreaseNumberOfLifes);
router.put("/AddUserLife/:userID", userController.addUserLife);
router.get("/GetNumberOfLife/:userID", userController.getNumberOfLifes);
router.put("/AddMoreUserInfo/:userID", userController.addMoreUserInfo);
router.get("/GetGoalByUser/:userID", userController.getGoalByUser);


router.post("/Login", authControler.login);
router.put("/ChangePassword/:userID", authControler.changePassword);

router.post("/SiginWithGoogle", googleController.siginWithGoogle);
router.get('/CheckGoogleToken', googleController.checkGoogleToken);

router.post("/SiginWithFacebook", facebookController.siginWithFacebook);
router.get('/CheckFacebookToken', facebookController.checkFacebookToken);

router.post("/CreateTechnology", technologyController.createTechnology);
router.get("/ListAllTechnologies", technologyController.listAllTechnologies);
router.post("/AssociateToTechnology/:userID", technologyController.associateUserToTechnology);
router.post('/ChangeTechnology', technologyController.changeTechnology);

router.post("/CreateGoal", goalController.createGoal);
router.post("/AssociateToGoal/:userID", goalController.associateUserToGoal);
router.get("/ListAllGoals", goalController.listAllGoals);

router.post("/CreateClassroom", classroomController.createClassroom);
router.get("/FindClassroomById/:classroomID", classroomController.findClassroomById);
router.get("/FindClassroomByChallenge/:challengeID", classroomController.findClassroomByChallenge);
router.get("/CountAllClassrooms", classroomController.countAllClassrooms);

router.post("/CreateExercise", exerciseController.createExercise);
router.get("/FindExerciseId/:exerciseID", exerciseController.findExerciseById);
router.post("/SendExerciseCode/:userID/:challengeID/:exerciseID", exerciseController.sendExerciseCode);

router.post("/CreateDifficulty", difficultyController.createDifficulty);
router.get("/FindDifficultyId/:difficultyID", difficultyController.findDifficultyById);

router.post("/CreateChallenge", challengeController.createChallenge);
router.get("/FindChallengeById/:challengeID", challengeController.findChallengeByID);
router.get("/FindChallengeByTechnology/:technologyID", challengeController.findChallengeByTechnology);
router.get("/FindUserChallengeByTechnology/:userID/:technologyID", challengeController.findUserChallengeByTechnology);
router.post("/InitChallenge/:userID/:challengeID", challengeController.initChallenge);
router.put("/FinishChallenge/:userID/:challengeID", challengeController.finishChllenge);

router.post("/CreateAlternative", alternativeController.createAlternative);
router.get("/FindAlternativeById/:alternativeID", alternativeController.findAlternativeByID);
router.get("/FindAlternativeByExercise/:exerciseID", alternativeController.findAlternativeByExercise);
router.get("/AlternativeIsCorrect/:alternativeID", alternativeController.alternativeIsCorrect);

router.post('/AddExperienceToUser/:userID', statisticsController.addExperienceToUser);
router.get('/GetMonthXpByUser/:userID', statisticsController.getMonthXpByUser);
router.get('/FindStatisticsByUser/:userID', statisticsController.findStatisticsByUser);
router.get('/GetHigherXp/:type', statisticsController.getHigherXP);
router.post('/Counter/:userID', statisticsController.counter);
router.get('/GetClassroomCompletedByUser/:userID', statisticsController.getClassroomCompletedByUser);
router.put('/CompletedGoal/:userID', statisticsController.completedGoal);

router.post('/CreateLevel', levelController.createLevel);
router.get('/ListAllLevels', levelController.listAllLevels);
router.get('/FindLevelById/:levelID', levelController.findLevelById);

router.post('/CreateAchievement', achievementController.createAchievement);
router.get('/FindAchievementById/:achievementID', achievementController.findAchievementByID);
router.get('/ListAllAchievement', achievementController.listAllAchievements);
router.put('/AssociateUserToAchievement/:userID', achievementController.associateUserToAchievement);
router.get('/ListAchievementUserHave/:userID', achievementController.listAchievementUserHave);

export default router;