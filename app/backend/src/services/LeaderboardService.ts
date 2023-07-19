import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import ILeaderboard from '../Interfaces/LeaderBoard/ILeaderboard';
// import IMatches from '../Interfaces/matches/IMatches';

export default class LeaderboardService {
  private leaderboard: ILeaderboard[] = [];

  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  private static teamObjectConstructor(homeTeamName: string): ILeaderboard {
    return {
      name: homeTeamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  private static balanceAndEfficienceCalculation(teamStats: ILeaderboard): void {
    teamStats.goalsBalance = teamStats.goalsFavor - teamStats.goalsOwn;
    teamStats.efficiency = (teamStats.totalPoints / (teamStats.totalGames * 3)) * 100;
  }

  private static teamStatsConstruction(match: any, leaderboard: ILeaderboard[]): void {
    let teamStats = leaderboard.find((eachStat) => eachStat.name === match.homeTeam?.teamName);

    if (!teamStats) {
      teamStats = LeaderboardService.teamObjectConstructor(match.homeTeam?.teamName);
      leaderboard.push(teamStats);
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

    LeaderboardService.balanceAndEfficienceCalculation(teamStats);
  }

  public async findAll(): Promise<ILeaderboard[]> {
    const allMatches = await this.matchModel.findAll();
    // const teamStatsArray: ILeaderboard[] = [];

    allMatches.forEach((eachMatch) => {
      if (!eachMatch.inProgress) {
        LeaderboardService.teamStatsConstruction(eachMatch, this.leaderboard);
      }
    });

    // this.leaderboard = teamStatsArray;
    return this.leaderboard;
  }
}
