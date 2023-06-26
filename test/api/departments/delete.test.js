const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();

    const testDepTwo = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2' });
    await testDepTwo.save();
  });

  it('/:id should delete chosen document', async () => {
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
    const deleted = await Department.findOne({ name: 'Department #1' });
    const notDeleted = await Department.findOne({ name: 'Department #2' });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(deleted).to.be.null;
    expect(notDeleted).to.not.be.null;
  });

  after(async () => {
    await Department.deleteMany();
  });
});
