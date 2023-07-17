import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatches from '../Interfaces/matches/IMatches';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces/index';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData;
  }

  async filterMatches(filter: boolean): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: filter },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData;
  }

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatches = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async finishMatch(id: IMatches['id'])
    : Promise<IMatches | string> {
    const [affectedRows] = await this.model.update(
      { inProgress: false },
      { where: { id },
        returning: true,
      },
    );
    if (affectedRows === 0) return 'Match has not been updated';

    return 'Match has been updated';
  }

  async update(id: IMatches['id'], homeTeamGoals: number, awayTeamGoals: number)
    : Promise<IMatches | string> {
    const [affectedRows] = await this.model.update(
      {
        homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    if (affectedRows === 0) return 'Match has not been updated';

    return 'Match has been updated';
  }

  async create(data: NewEntity<IMatches>): Promise<IMatches> {
    const dbData = await this.model.create(data);

    const { id, homeTeamId, homeTeamGoals,
      awayTeamId, awayTeamGoals, inProgress }: IMatches = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
