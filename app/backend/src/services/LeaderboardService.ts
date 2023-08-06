import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import ILeaderboard from '../Interfaces/LeaderBoard/ILeaderboard';
import IMatches from '../Interfaces/matches/IMatches';

export default class LeaderboardService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  private static homeTeamObjectConstructor(homeTeamName: string | undefined): ILeaderboard {
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

  private static awayTeamObjectConstructor(awayTeamName: string | undefined): ILeaderboard {
    return {
      name: awayTeamName || '',
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

  private static homeTeamStatsConstruction(match: IMatches, teamStatsArray: ILeaderboard[]): void {
    // buncando pelo nome do time no array
    let teamStats = teamStatsArray.find((eachStat) => eachStat.name === match.homeTeam?.teamName);

    if (!teamStats) {
      // construindo o objeto do time com o nome passado no parâmetro
      teamStats = LeaderboardService.homeTeamObjectConstructor(match.homeTeam?.teamName);
      // inserindo o objeto no array de times da casa
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

  private static awayTeamStatsConstruction(match: IMatches, teamStatsArray: ILeaderboard[]): void {
    // buncando pelo nome do time no array
    let teamStats = teamStatsArray.find((eachStat) => eachStat.name === match.awayTeam?.teamName);

    if (!teamStats) {
      // construindo o objeto do time com o nome passado no parâmetro
      teamStats = LeaderboardService.awayTeamObjectConstructor(match.awayTeam?.teamName);
      // inserindo o objeto no array de times da casa
      teamStatsArray.push(teamStats);
    }

    teamStats.totalGames += 1;
    teamStats.goalsFavor += match.awayTeamGoals;
    teamStats.goalsOwn += match.homeTeamGoals;

    if (match.awayTeamGoals > match.homeTeamGoals) {
      teamStats.totalPoints += 3;
      teamStats.totalVictories += 1;
    } else if (match.awayTeamGoals === match.homeTeamGoals) {
      teamStats.totalPoints += 1;
      teamStats.totalDraws += 1;
    } else {
      teamStats.totalLosses += 1;
    }
  }

  private static updatedTeamStatsArray(teamStatsArray: any[]): ILeaderboard[] | any {
    return teamStatsArray.map((eachMatch) => {
      const goalsBalance = eachMatch.goalsFavor - eachMatch.goalsOwn;
      const efficiency = (eachMatch.totalPoints / (eachMatch.totalGames * 3)) * 100;

      return { ...eachMatch, goalsBalance, efficiency };
    });
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

  public async findAllHome(): Promise<ILeaderboard[]> {
    const allMatches = await this.matchModel.findAll();
    const teamStatsArray: ILeaderboard[] = [];

    allMatches.forEach((eachMatch) => {
      if (eachMatch.inProgress === false) {
        LeaderboardService.homeTeamStatsConstruction(eachMatch as IMatches, teamStatsArray);
      }
    });

    const updatedTeamStatsArray = LeaderboardService.updatedTeamStatsArray(teamStatsArray);
    // const updatedTeamStatsArray: ILeaderboard[] = teamStatsArray.map((eachMatch) => {
    //   const goalsBalance = eachMatch.goalsFavor - eachMatch.goalsOwn;
    //   const efficiency = (eachMatch.totalPoints / (eachMatch.totalGames * 3)) * 100;

    //   return { ...eachMatch, goalsBalance, efficiency };
    // });

    const sortedLeaderboard = LeaderboardService.sortLeaderboard(updatedTeamStatsArray);

    return sortedLeaderboard;
  }

  public async findAllAway(): Promise<ILeaderboard[]> {
    const allMatches = await this.matchModel.findAll();
    const teamStatsArray: ILeaderboard[] = [];

    allMatches.forEach((eachMatch) => {
      if (eachMatch.inProgress === false) {
        LeaderboardService.awayTeamStatsConstruction(eachMatch as IMatches, teamStatsArray);
      }
    });

    const updatedTeamStatsArray = LeaderboardService.updatedTeamStatsArray(teamStatsArray);

    const sortedLeaderboard = LeaderboardService.sortLeaderboard(updatedTeamStatsArray);

    return sortedLeaderboard;
  }
}
