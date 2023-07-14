import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { ILogin } from '../Interfaces/users/ILogin';
import UserModel from '../models/UserModel';
import JwtUtils from '../utils/JwtUtils';

export default class AuthController {
  private model: UserModel = new UserModel();

  async login(req: Request, res: Response) {
    const { email, password } = req.body as ILogin;
    const user = await this.model.findOne(email);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = JwtUtils.sign({ id: user.id });

    return res.status(200).json({
      token,
    });
  }
}
