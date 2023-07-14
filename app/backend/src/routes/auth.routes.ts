import { Router } from 'express';
import AuthValidation from '../middlewares/AuthValidation';
import AuthController from '../controllers/AuthController';
import Validations from '../middlewares/LoginValidation';
import UserController from '../controllers/UserControllet';

const authRouter = Router();

const authController = new AuthController();
const userController = new UserController();

authRouter.post(
  '/',
  Validations.validateFields,
  Validations.validateLogin,
  (req, res) => authController.login(req, res),
);
authRouter.get(
  '/role',
  AuthValidation,
  (req, res) => userController.findRole(req, res),
);

export default authRouter;
