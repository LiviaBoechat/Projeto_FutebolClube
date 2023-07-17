import IMatches from './IMatches';

export interface IMatchModel {
  findAll(): Promise<IMatches[]>,
  filteredMatches(filter: boolean): Promise<IMatches[]>
  findById(id: IMatches['id']): Promise<IMatches | null>
  finishMatch(id: IMatches['id']): Promise<IMatches | string>
  // update(id: IMatches['id'], data): Promise<IMatches | string>
}
