// import { NewEntity } from '../Interfaces/index';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import IMatches from '../Interfaces/matches/IMatches';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { NewEntity } from '../Interfaces/index';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async filterMatches(filter: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchModel.filterMatches(filter);
    if (!matches) return { status: 'INVALID_DATA', data: { message: 'Match not found' } };
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const matchFound = await this.matchModel.findById(id);
    if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    const updatedMatch = await this.matchModel.finishMatch(id);
    if (!updatedMatch) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async update(id: number, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<ServiceResponse<ServiceMessage>> {
    const matchFound = await this.matchModel.findById(id);
    if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    const updatedMatch = await this.matchModel.update(id, homeTeamGoals, awayTeamGoals);
    if (!updatedMatch) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Match updated' } };
  }

  public async create(data: NewEntity<IMatches>)
    : Promise<ServiceResponse<IMatches | ServiceMessage>> {
    // Verifica se os times existem na tabela de times
    const homeTeamExists = await this.teamModel.findById(data.homeTeamId);
    const awayTeamExists = await this.teamModel.findById(data.awayTeamId);

    if (!homeTeamExists || !awayTeamExists) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.create(data);
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
