const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '10d' });
};

const signupUser = async (req, res) => {
  const {
    fullName,
    email,
    password,
    // phoneNumber,
    // gender,
    // date_of_birth,
    // accountType,
  } = req.body;
};

try {
  if (!email || !password || !fullName)
    res.status(400).json({ erro: })
    throw new Error('Email or Password are required');

  const exists = await User.findOne({ fullName, email, password });
      if (exists) return res.status;

  }
} catch (error) {}
