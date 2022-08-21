import { Router, Request, Response } from 'express';
import UserController from './controller/UserController';

const router = Router();

 const userController = new UserController();

router.post("/CreateUser", userController.postUser)

export default router 