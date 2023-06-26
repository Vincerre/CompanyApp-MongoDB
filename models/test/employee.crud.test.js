const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect(
        'mongodb://localhost:27017/companyDBtest',
        { useNewUrlParser: true },
        { useUnifiedTopology: true }
      );
    } catch (err) {
      console.error(err);
    }
  });

  //*NOTE - Reading Data block

  describe('Reading Data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Adam', lastName: 'Donely', department: 'Transport' });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });
    it('should return proper document by various params with findOne method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      const expected = { firstName: 'John', lastName: 'Doe', department: 'Marketing' };
      expect(employee.firstName).to.be.equal(expected.firstName);
      expect(employee.lastName).to.be.equal(expected.lastName);
      expect(employee.department).to.be.equal(expected.department);
    });
    after(async () => {
      await Employee.deleteMany();
    });
  });

  //*NOTE - Creating Data block

  describe('Creating Data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });
    after(async () => {
      await Employee.deleteMany();
    });
  });

  //*NOTE - Updating Data block

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Adam', lastName: 'Donely', department: 'Transport' });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'John' }, { $set: { firstName: '=John=' } });
      const updatedEmployee = await Employee.findOne({ firstName: '=John=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      employee.firstName = '=John=';
      await employee.save();
      const updatedEmployee = await Employee.findOne({ firstName: '=John=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
      const employees = await Employee.find({ firstName: 'Updated!' });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  //*NOTE - Removing Data block

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Adam', lastName: 'Donely', department: 'Transport' });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const removedEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});
