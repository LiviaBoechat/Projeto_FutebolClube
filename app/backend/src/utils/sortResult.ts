// import ILeaderboard from '../Interfaces/LeaderBoard/ILeaderboard';

// export default class LeaderboardService {
//   private static sortLeaderboard(updatedTeamStatsArray: ILeaderboarderboard[]): ILeaderboard[] {
//     return updatedTeamStatsArray.sort((a, b) => {

//       if (b.totalPoints !== a.totalPoints) {
//         return b.totalPoints - a.totalPoints;
//       }

//       if (b.totalVictories !== a.totalVictories) {
//         return b.totalVictories - a.totalVictories;
//       }

//       if (b.goalsBalance !== a.goalsBalance) {
//         return b.goalsBalance - a.goalsBalance;
//       }
//       if (b.goalsFavor !== a.goalsFavor) {
//         return b.goalsFavor - a.goalsFavor;
//       }

//       return b.efficiency - a.efficiency;
//     });
//   }
// }

// private static sortLeaderboard(updatedTeamStatsArray: any[]): ILeaderboard[] {
//     const fields = ['totalPoints', 'totalGames',
//       'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'efficiency'];

//     return updatedTeamStatsArray.sort((a, b) => {
//       const fieldDiff = fields.find((field) => b[field] !== a[field]);
//       if (fieldDiff) {
//         return fieldDiff === 'goalsBalance'
//           ? a[fieldDiff] - b[fieldDiff] : b[fieldDiff] - a[fieldDiff];
//       }
//       return 0;
//     });
//   }
