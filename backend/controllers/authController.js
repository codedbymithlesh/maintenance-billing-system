const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  const { name, email, password, role, flatNumber, contact } = req.body;
  try {
    const userExists = await User.findOne({ 
      $or: [
        { email: email }, 
        { contact: contact }
      ] 
    });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const roomOccupied = await User.findOne({ flatNumber: flatNumber });
    if (roomOccupied) return res.status(400).json({ message: 'Flat number already occupied' });

    const user = await User.create({ name, email, password, role, flatNumber, contact });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        flatNumber: user.flatNumber,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.registerAdmin = async (req, res) => {
  const { name, email, password, contact } = req.body;
  
  try {
    const userExists = await User.findOne({ 
      $or: [
        { email: email }, 
        { contact: contact }
      ] 
    });

    if (userExists) {
      return res.status(400).json({ message: 'User with this email or contact already exists' });
    }
    const user = await User.create({ 
      name, 
      email, 
      password, 
      role: 'admin', 
      contact 
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};