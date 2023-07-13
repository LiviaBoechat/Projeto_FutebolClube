import ITeams from './ITeams';

export interface ITeamModel {
  findAll(): Promise<ITeams[]>,
  findById(id: ITeams['id']): Promise<ITeams | null>
}
