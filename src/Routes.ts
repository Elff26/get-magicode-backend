import { Router, Request, Response } from 'express';
import UserController from './controller/UserController';

const router = Router();

 const userController = new UserController();

router.post("/CreateUser", userController.createUser)

router.get("/FindUserById/:cdUsuario", userController.findUserById)

export default router 