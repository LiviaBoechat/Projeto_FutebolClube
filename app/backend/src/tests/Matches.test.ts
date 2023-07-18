import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matchMock, matchesMock, reqCreateMatch, tokenMock, trueMatchesMock, updateEqualMatchMock, updateMatchMock } from './mocks/Matches.mock';

import { Response } from 'superagent';
import MatchModel from '../models/MatchModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Matches test', () => {
    afterEach(sinon.restore);
  
    it('should return all matches', async () => {
      // Arrange
      sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock as any);
  
      // Act
      const { status, body } = await chai.request(app).get('/matches');
  
      // Assert
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesMock);
    });
    
    it('should return matches inProgress by sending /matches?inProgress=true', async () => {
        // Arrange
        sinon.stub(SequelizeMatch, 'findAll').resolves(trueMatchesMock as any);
    
        // Act
        const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    
        // Assert
        expect(status).to.equal(200);
        expect(body).to.deep.equal(trueMatchesMock);
      });

      it('should update an inProgress match', async () => {
        // Arrange
        const matchIdMock = 1;
        sinon.stub(SequelizeMatch, 'findByPk').resolves(matchMock as any);
        sinon.stub(SequelizeMatch, 'update').resolves([1]);
      
        // Act
        const { status, body } = await chai.request(app).patch(`/matches/${matchIdMock}`).send(updateMatchMock).set({ Authorization: tokenMock });
      
        // Assert
        expect(status).to.equal(200);
      });
      
    it('should return not found if the match does not exist in db', async () => {
      // Arrange
      const matchId = 999;
      sinon.stub(MatchModel.prototype, 'update').resolves('Match has not been updated');
  
      // Act
      const { status, body } = await chai.request(app).patch(`/matches/${matchId}`).send(updateMatchMock).set({ Authorization: tokenMock });
  
      // Assert
      expect(status).to.equal(404);
      expect(body.message).to.equal({ "message": "There is no team with such id!" });
    });
  
    // it('should return an error if the home team and away team are equal', async () => {
    //   // Arrange
    //   sinon.stub(SequelizeMatch, 'update').resolves(matchServiceStub);
  
    //   // Act
    //   const { status, body } = await chai.request(app).post('/matches').send(updateEqualMatchMock);
  
    //   // Assert
    //   expect(status).to.equal(422);
    //   expect(body.message).to.equal(errorMessage);
    // });

    it('should create a new match', async () => {
        // Arrange
        sinon.stub(SequelizeMatch, 'create').returns(matchMock as any);
    
        // Act
        const { status, body } = await chai.request(app).post('/matches').send(reqCreateMatch).set({ Authorization: tokenMock });
    
        // Assert
        expect(status).to.equal(201);
        expect(body).to.deep.equal(matchMock);
      });
  });