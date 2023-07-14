import * as jwt from 'jsonwebtoken';
import { Identifiable } from '../Interfaces/index';

export default class JwtUtils {
  static jwtSecret = process.env.JWT_SECRET || 'xablau';

  static sign(payload: Identifiable): string {
    return jwt.sign(payload, JwtUtils.jwtSecret);
  }

  static verify(token: string): Identifiable | undefined {
    try {
      const decoded = jwt.verify(token, JwtUtils.jwtSecret) as Identifiable;
      return decoded;
    } catch (error) {
      console.log(error);
    }
  }
}
