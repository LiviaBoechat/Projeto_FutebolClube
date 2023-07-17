// import { NewEntity } from '..';
import IMatches from './IMatches';

export interface IMatchModel {
  findAll(): Promise<IMatches[]>,
  filterMatches(filter: boolean): Promise<IMatches[]>
  findById(id: IMatches['id']): Promise<IMatches | null>
  finishMatch(id: IMatches['id']): Promise<IMatches | string>
  update(id: IMatches['id'], homeTeamGoals: number,
    awayTeamGoals: number): Promise<IMatches | string>
  create(data: Partial<IMatches>): Promise<IMatches>
}
