// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { App } from '../app';
// import { users, userWithoutPassword } from '../tests/mocks/User.mocks';

// // @ts-ignore

// import SequelizeUser from '../../src/database/models/SequelizeUser';

// chai.use(chaiHttp);

// const { expect } = chai;

// const { app } = new App();

// describe('Users Test', function() {
//   it('should return all users', async function() {
//     sinon.stub(SequelizeUser, 'findAll').resolves(users as any);

//     const { status, body } = await chai.request(app).get('/users');

//     expect(status).to.equal(200);
//     expect(body).to.deep.equal(users);
//   });

//   it('should return a user by id', async function() {
//     sinon.stub(SequelizeUser, 'findByPk').resolves(userWithoutPassword as any);

//     const { status, body } = await chai.request(app).get('/users/1');

//     expect(status).to.equal(200);
//     expect(body).to.deep.equal(userWithoutPassword);
//   });

//   it('should return a message when user is not found', async function() {
//     sinon.stub(SequelizeUser, 'findByPk').resolves(null);

//     const { status, body } = await chai.request(app).get('/users/1');

//     expect(status).to.equal(404);
//     expect(body.message).to.equal('User not found');
//   });

//   afterEach(sinon.restore);
// });