import College from '../models/College.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

// Add new college (Admin only)
export const addCollege = async (req, res, next) => {
  try {
    const { name, domain } = req.body;
    const college = await College.create({ name, domain });
    res.status(201).json(new ApiResponse(college, 'College added'));
  } catch (err) {
    next(new ApiError(400, 'College already exists'));
  }
};

// Get all colleges
export const getColleges = async (req, res, next) => {
  try {
    const colleges = await College.find({ verified: true });
    res.json(new ApiResponse(colleges, 'Colleges list'));
  } catch (err) {
    next(err);
  }
};