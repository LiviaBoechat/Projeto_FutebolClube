import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async findAll(_req: Request, res: Response) {
    const serviceResponse = await this.userService.findAll();
    res.status(200).json(serviceResponse.data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.userService.findById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  public async findRole(req: Request, res: Response) {
    const { id } = res.locals.user;
    console.log('CONTRO', id);

    const serviceResponse = await this.userService.findRole(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json({ role: serviceResponse.data });
  }
}
