import { Router, Request, Response } from 'express';

import UserController from './controller/UserController';
import AuthController from './controller/AuthController';

const router = Router();

const userController = new UserController();
const authControler = new AuthController();

router.get("/FindUserById/:userID", userController.findUserById);
router.post("/CreateUser", userController.createUser);
router.put("/UpdateUser/:userID", userController.updateUser);
router.delete("/DeleteUser/:userID", userController.deleteUSer);
router.put("/CodeAndDateGenerator", userController.insertCodeAndDatePasswordbyUser)

router.post("/Login", authControler.login);

export default router; 