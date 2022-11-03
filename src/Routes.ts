import { Router, Request, Response } from 'express';

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
import TipController from './controller/TipController';
import JwtVerify from './middleware/JwtVerify';

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
const tipController = new TipController();

const jwtVerify = new JwtVerify();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        succes: true
    })
})

router.post("/CreateUser", userController.createUser);
router.get("/FindUserById/:userID", jwtVerify.verify, userController.findUserById);
router.put("/UpdateUser/:userID", jwtVerify.verify, userController.updateUser);
router.delete("/DeleteUser/:userID", jwtVerify.verify, userController.deleteUSer);
router.put("/CodeAndDateGenerator", userController.insertCodeAndDatePasswordbyUser);
router.post("/VerificationCode/:userID", userController.verificationCode);
router.put("/DecreaseNumberOfLifes/:userID", jwtVerify.verify, userController.decreaseNumberOfLifes);
router.put("/AddUserLife/:userID", jwtVerify.verify, userController.addUserLife);
router.get("/GetNumberOfLife/:userID", jwtVerify.verify, userController.getNumberOfLifes);
router.put("/AddMoreUserInfo/:userID", jwtVerify.verify, userController.addMoreUserInfo);
router.put("/SaveProfilePicture/:userID", jwtVerify.verify, userController.saveProfilePicture);
router.get("/GetProfilePicture/:userID", jwtVerify.verify, userController.getProfilePicture);

router.post("/Login", authControler.login);
router.put("/ChangePassword/:userID", jwtVerify.verify, authControler.changePassword);

router.post("/SiginWithGoogle", googleController.siginWithGoogle);
router.get('/CheckGoogleToken', googleController.checkGoogleToken);

router.post("/SiginWithFacebook", facebookController.siginWithFacebook);
router.get('/CheckFacebookToken', facebookController.checkFacebookToken);

router.post("/CreateTechnology", technologyController.createTechnology);
router.get("/ListAllTechnologies", jwtVerify.verify, technologyController.listAllTechnologies);
router.post("/AssociateToTechnology/:userID", jwtVerify.verify, technologyController.associateUserToTechnology);
router.post('/ChangeTechnology', jwtVerify.verify, technologyController.changeTechnology);

router.post("/CreateGoal", goalController.createGoal);
router.post("/AssociateToGoal/:userID", jwtVerify.verify, goalController.associateUserToGoal);
router.get("/ListAllGoals", jwtVerify.verify, goalController.listAllGoals);
router.get("/GetGoalByUser/:userID", jwtVerify.verify, goalController.getGoalByUser);

router.post("/CreateClassroom", classroomController.createClassroom);
router.get("/FindClassroomById/:classroomID", jwtVerify.verify, classroomController.findClassroomById);
router.get("/FindClassroomByChallenge/:challengeID", jwtVerify.verify, classroomController.findClassroomByChallenge);
router.get("/CountAllClassrooms", classroomController.countAllClassrooms);

router.post("/CreateExercise", exerciseController.createExercise);
router.get("/FindExerciseId/:exerciseID", jwtVerify.verify, exerciseController.findExerciseById);
router.post("/SendExerciseCode/:userID/:exerciseID", jwtVerify.verify, exerciseController.sendExerciseCode);
router.get("/FindExercisesByIDs", jwtVerify.verify, exerciseController.findExercisesByIds);
router.get("/RandomizeExercise", exerciseController.randomizeExercisesIDs);

router.post("/CreateDifficulty", difficultyController.createDifficulty);
router.get("/FindAllDifficulties", difficultyController.findAllDifficulties);
router.get("/FindDifficultyId/:difficultyID", difficultyController.findDifficultyById);

router.post("/CreateChallenge", challengeController.createChallenge);
router.get("/FindChallengeById/:challengeID", challengeController.findChallengeByID);
router.get("/FindChallengeByTechnologyAndDifficulty/:technologyID/:difficultyID", challengeController.findChallengeByTechnologyAndDifficulty);
router.get("/FindUserChallengeByTechnologyAndDifficulty/:userID/:technologyID/:difficultyID", challengeController.findUserChallengeByTechnologyAndDifficulty);
router.post("/InitChallenge/:userID/:challengeID", challengeController.initChallenge);
router.put("/FinishChallenge/:userID/:challengeID", challengeController.finishChllenge);
router.get("/FindChallengeByExercises", challengeController.findChallengesByExercisesIds);

router.post("/CreateAlternative", alternativeController.createAlternative);
router.get("/FindAlternativeById/:alternativeID", alternativeController.findAlternativeByID);
router.get("/FindAlternativeByExercise/:exerciseID", alternativeController.findAlternativeByExercise);
router.get("/AlternativeIsCorrect/:alternativeID", alternativeController.alternativeIsCorrect);

router.post('/CreateUserStatistics/:userID', statisticsController.createUserStatistics);
router.post('/AddExperienceToUser/:userID', jwtVerify.verify, statisticsController.addExperienceToUser);
router.get('/GetMonthXpByUser/:userID', jwtVerify.verify, statisticsController.getMonthXpByUser);
router.get('/FindStatisticsByUser/:userID', jwtVerify.verify,  statisticsController.findStatisticsByUser);
router.get('/GetHigherXp/:type', statisticsController.getHigherXP);
router.post('/Counter/:userID', statisticsController.counter);
router.get('/GetClassroomCompletedByUser/:userID', jwtVerify.verify, statisticsController.getClassroomCompletedByUser);
router.put('/CompletedGoal/:userID', jwtVerify.verify, statisticsController.completedGoal);

router.post('/CreateLevel', levelController.createLevel);
router.get('/ListAllLevels', levelController.listAllLevels);
router.get('/FindLevelById/:levelID', levelController.findLevelById);

router.post('/CreateAchievement', achievementController.createAchievement);
router.get('/FindAchievementById/:achievementID', achievementController.findAchievementByID);
router.get('/ListAllAchievement', achievementController.listAllAchievements);
router.put('/AssociateUserToAchievement/:userID', jwtVerify.verify, achievementController.associateUserToAchievement);
router.get('/ListAchievementUserHave/:userID', jwtVerify.verify, achievementController.listAchievementUserHave);

router.post('/CreateTip', tipController.createTip);
router.get('/FindTipByExercise/:exerciseID', tipController.findTipByExercise);

export default router;