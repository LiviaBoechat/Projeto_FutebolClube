import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/JwtUtils';
import IUser from '../Interfaces/users/IUsers';

export default async function authValidation(req: Request, res: Response, next: NextFunction)
  :Promise<Response | void> {
  // onde fica o token
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  // considerando o formato Bearer do token
  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  try {
    const decoded = jwt.verify(token) as IUser;
    // guarda info. do usuario que gerou o token no req.locals.user
    res.locals.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
