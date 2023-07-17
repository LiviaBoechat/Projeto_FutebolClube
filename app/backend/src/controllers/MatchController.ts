import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async filterMatches(req: Request, res: Response) {
    const filter = req.query.inProgress;

    if (filter) {
      const serviceResponse = await this.matchService.filterMatches(filter === 'true');
      return res.status(200).json(serviceResponse.data);
    }

    const serviceResponse = await this.matchService.findAll();
    res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const serviceResponse = await this.matchService.finishMatch(id);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchService.update(id, homeTeamGoals, awayTeamGoals);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async create(req: Request, res: Response) {
    const data = req.body;
    const serviceResponse = await this.matchService.create({ ...data, inProgress: true });
    return res.status(201).json(serviceResponse.data);
  }
}
