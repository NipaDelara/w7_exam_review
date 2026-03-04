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

  try {
    if (!fullName || !email || !password) {
      res.status(400);
      throw new Error('Email or Password are required');
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    if (user) {
      const token = createToken(user._id);
      res.status(201).json({ user, token });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const token = createToken(user._id);
      res.status(200).json({ email, token });
      throw new Error('Invalid email or password');
    } else {
      res.status(400);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { signupUser, loginUser };
