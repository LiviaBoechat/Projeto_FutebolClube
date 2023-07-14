import { NextFunction, Request, Response } from 'express';
import Email from '../utils/EmailValidation';
import { ILogin } from '../Interfaces/users/ILogin';

class Validations {
  private static passwordMinLength = 6;

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;
    if (!Email.isValidEmail(email) || password.length < Validations.passwordMinLength) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }
    next();
  }

  static validateFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;
    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    next();
  }
}

export default Validations;
