const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if no "firstName" "lastName" or "department" arg', () => {
    const cases = [
      { firstName: '', lastName: '', department: '' },
      { firstName: 'John', lastName: '', department: '' },
      { firstName: '', lastName: 'Doe', department: '' },
      { firstName: '', lastName: '', department: 'Marketing' },
    ];
    for (let name of cases) {
      const emp = new Employee(name);
      emp.validate((err) => {
        expect(err.errors.firstName || err.errors.lastName || err.errors.department).to.exist;
      });
    }
  });
  it('should throw an err if "firstName"  is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const emp = new Employee(name);
      emp.validate((err) => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });
  it('should throw an err if "lastName"  is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const emp = new Employee(name);
      emp.validate((err) => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });
  it('should throw an err if "department"  is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const emp = new Employee(name);
      emp.validate((err) => {
        expect(err.errors.department).to.exist;
      });
    }
  });
  it('should not throw an err if arguments are correct', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'Marketing' },
      { firstName: 'Evelyn', lastName: 'Donely', department: 'Transport' },
      { firstName: 'Adam', lastName: 'Jenkins', department: 'Management' },
    ];
    for (let name of cases) {
      const emp = new Employee(name);
      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
  after(() => {
    mongoose.models = {};
  });
});
