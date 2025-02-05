import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new ApiError(401, 'Authentication required');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
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