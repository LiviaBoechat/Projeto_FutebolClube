import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import ILeaderboard from '../Interfaces/LeaderBoard/ILeaderboard';
import IMatches from '../Interfaces/matches/IMatches';

export default class LeaderboardService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  private static teamObjectConstructor(homeTeamName: string | undefined): ILeaderboard {
    return {
      name: homeTeamName || '',
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

  private static teamStatsConstruction(match: IMatches, teamStatsArray: ILeaderboard[]): void {
    let teamStats = teamStatsArray.find((eachStat) => eachStat.name === match.homeTeam?.teamName);

    if (!teamStats) {
      teamStats = LeaderboardService.teamObjectConstructor(match.homeTeam?.teamName);
      teamStatsArray.push(teamStats);
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

  private static sortLeaderboard(updatedTeamStatsArray: any[]): ILeaderboard[] {
    return updatedTeamStatsArray.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      return b.goalsFavor - a.goalsFavor;
    });
  }

  public async findAll(): Promise<ILeaderboard[]> {
    const allMatches = await this.matchModel.findAll();
    const teamStatsArray: ILeaderboard[] = [];

    allMatches.forEach((eachMatch) => {
      if (eachMatch.inProgress === false) {
        LeaderboardService.teamStatsConstruction(eachMatch as IMatches, teamStatsArray);
      }
    });

    const updatedTeamStatsArray: ILeaderboard[] = teamStatsArray.map((eachMatch) => {
      const goalsBalance = eachMatch.goalsFavor - eachMatch.goalsOwn;
      const efficiency = (eachMatch.totalPoints / (eachMatch.totalGames * 3)) * 100;

      return { ...eachMatch, goalsBalance, efficiency };
    });

    const sortedLeaderboard = LeaderboardService.sortLeaderboard(updatedTeamStatsArray);

    return sortedLeaderboard;
  }
}
