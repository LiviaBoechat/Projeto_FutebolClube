// import * as sinon from 'sinon';
// import * as chai from 'chai';

// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { App } from '../app';
// import SequelizeMatch from '../database/models/SequelizeMatch';
// import SequelizeTeam from '../database/models/SequelizeTeam';
// import { allLeaderboardMock } from './mocks/Matches.mock';

// import { Response } from 'superagent';
// import MatchModel from '../models/MatchModel';

// chai.use(chaiHttp);

// const { app } = new App();
// const { expect } = chai;

// describe('Leaderboard test', () => {

//   afterEach(sinon.restore);

//   describe('GET /leaderboard', () => {
//     it('should return a sorted leaderboard of all teams', async () => {
//       // Arrange
//       const buildTest = SequelizeMatch.bulkBuild()
//       sinon.stub(SequelizeMatch, 'findAll').resolves(allLeaderboardMock as any);

//       // Act
//       const { status, body }  = await chai.request(app).get('/leaderboard');

//       // Assert
//       expect(status).to.equal(200);
//       expect(body).to.deep.equal(allLeaderboardMock);
//     });


//   });

// //   describe('GET /leaderboard/home', () => {
// //     it('should return a sorted leaderboard of home teams', async () => {
// //       // Arrange
// //       sinon.stub(leaderboardService, 'findAllHome').resolves(matchesMock as any);

// //       // Act
// //       const response = await chai.request(app).get('/leaderboard/home');

// //       // Assert
// //       expect(response.status).to.equal(200);
// //       expect(response.body).to.deep.equal(matchesMock);
// //     });
// //   });

// //   describe('GET /leaderboard/away', () => {
// //     it('should return a sorted leaderboard of away teams', async () => {
// //       // Arrange
// //       sinon.stub(leaderboardService, 'findAllAway').resolves(trueMatchesMock as any);

// //       // Act
// //       const response = await chai.request(app).get('/leaderboard/away');

// //       // Assert
// //       expect(response.status).to.equal(200);
// //       expect(response.body).to.deep.equal(trueMatchesMock);
// //     });
// //   });
// });