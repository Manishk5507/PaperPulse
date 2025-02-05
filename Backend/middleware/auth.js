import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // console.log("token-----:    ",token);
    if (!token) throw new ApiError(401, 'Authentication required');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded----:    ",decoded);
    const user = await User.findById(decoded.id);
    // console.log("user: ",user);

    if (!user) throw new ApiError(401, 'User not found');
    
    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(401, 'Invalid authentication'));
  }
};

export const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ApiError(403, 'Admin access required'));
  }
  next();
};