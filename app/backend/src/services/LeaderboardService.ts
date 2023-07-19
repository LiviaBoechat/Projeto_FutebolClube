import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

interface TeamStats {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

export default class LeaderboardService {
  private leaderboard: TeamStats[] = [];

  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public static teamObjectConstructor(teamStats: [], homeTeamName: string, teamStatsArray: any) {
    if (!teamStats) {
      const teamObject = {
        name: homeTeamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
      };
      teamStatsArray.push(teamObject);
      return teamObject;
    }
  }

  public static teamStaticsConstruction(match: any, teamStatsArray: any) {
    const homeTeamName = match.homeTeam?.teamName || '';

    let teamStats = teamStatsArray.find((eachStat: any) => eachStat.name === homeTeamName);
    if (!teamStats) {
      teamStats = LeaderboardService.teamObjectConstructor(teamStats, homeTeamName, teamStatsArray);
    }

    teamStats.totalGames += 1;
    teamStats.goalsFavor += match.homeTeamGoals;
    teamStats.goalsOwn += match.awayTeamGoals;

    if (match.homeTeamGoals > match.awayTeamGoals) {
      teamStats.totalPoints += 3;
      teamStats.totalVictories += 1;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      teamStats.totalPoints += 1;
      teamStats.totalDraws += 1;
    } else {
      teamStats.totalLosses += 1;
    }
  }

  public async findAll(): Promise<TeamStats[]> {
    const allMatches = await this.matchModel.findAll();
    const teamStatsArray: TeamStats[] = [];

    allMatches.forEach((match) => {
      if (!match.inProgress) {
        LeaderboardService.teamStaticsConstruction(match, teamStatsArray);
      }
    });

    this.leaderboard = teamStatsArray;
    return this.leaderboard;
  }
}
