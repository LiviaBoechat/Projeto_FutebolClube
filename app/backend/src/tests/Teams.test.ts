import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teamMock, teamsMock } from './mocks/Teams.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams test', () => {
  afterEach(sinon.restore);

  it('should return all teams', async function() {
    // Arrange (Mock)
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock as any);
     // Act
    const { status, body } = await chai.request(app).get('/teams');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMock);
  });

  it('should return a team by id', async function() {
    // Arrange (Mock)
    sinon.stub(SequelizeTeam, 'findByPk').resolves(teamMock as any);
     // Act
    const { status, body } = await chai.request(app).get('/teams/1');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamMock);
  });

  // it('should return not found if the team doesn\'t exists', async function() {
  //    // Arrange (Mock)
  //   sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
  //   // Act
  //   const { status, body } = await chai.request(app).get('/teams/1');
  //   // Assert
  //   expect(status).to.equal(404);
  //   expect(body.message).to.equal('Team 1 not found');
  // });

});
