import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Validations from '../middlewares/LoginValidation';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/',
  Validations.validateFields,
  Validations.validateLogin,
  (req, res) => authController.login(req, res),
);
authRouter.post(
  '/role',
  Validations.validateFields,
  Validations.validateLogin,
  (req, res) => authController.login(req, res),
);

export default authRouter;
