import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async findAllHome(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.findAllHome();
    res.status(200).json(serviceResponse);
  }

  public async findAllAway(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.findAllAway();
    res.status(200).json(serviceResponse);
  }
}
