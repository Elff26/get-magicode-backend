import { Router, Request, Response } from 'express';
import UserController from './controller/UserController';

const router = Router();

const userController = new UserController();

router.get("/FindUserById/:cdUsuario", userController.findUserById);
router.post("/CreateUser", userController.createUser);
router.put("/UpdateUser/:cdUsuario", userController.updateUSer);
router.delete("/DeleteUser/:cdUsuario", userController.deleteUSer);

export default router;