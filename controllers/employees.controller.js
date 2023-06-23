const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().skip(rand);
    if (!dep) res.status.apply(404).json({ message: 'Not found...' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id).populate('department');
    if (!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.add = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName });
    await newEmployee.save();
    res.json({ message: 'Added' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const dep = await Employee.findById(req.params.id);
    if (dep) {
      dep.firstName = firstName;
      dep.lastName = lastName;
      await dep.save();
      res.json({ message: 'Updated' });
    } else res.status.apply(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id);
    if (dep) {
      await Employee.deleteOne(dep);
      res.json({ message: 'deleted' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
