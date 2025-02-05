import User from '../models/User.js';
import College from '../models/College.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../utils/emailSender.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const domain = email.split('@')[1];
    
    const college = await College.findOne({ domain });
    if (!college) throw new ApiError(400, 'Invalid college email');

    const user = await User.create({ name, email, password, college: college._id });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await sendVerificationEmail(user.email, token);

    res.status(201).json(new ApiResponse(user, 'Verification email sent'));
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.matchPassword(password))) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json(new ApiResponse({ token }, 'Login successful'));
  } catch (err) {
    next(err);
  }
};