import * as jwt from 'jsonwebtoken';
import { Identifiable } from '../Interfaces/index';

export default class JwtUtils {
  private jwtSecret = process.env.JWT_SECRET || 'xablau';

  sign(payload: Identifiable): string {
    return jwt.sign(payload, this.jwtSecret);
  }
}
