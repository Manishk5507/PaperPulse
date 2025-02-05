import Paper from '../models/Paper.js';
import User from '../models/User.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

// Get all pending papers
export const getAllPendingPapers = async (req, res, next) => {
  try {
    const papers = await Paper.find({ status: 'pending' })
      .populate('uploadedBy', 'name email')
      .populate('college', 'name');
    res.json(new ApiResponse(papers, 'Pending papers retrieved'));
  } catch (err) {
    next(err);
  }
};

// Approve a paper
export const approvePaper = async (req, res, next) => {
  try {
    const paper = await Paper.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!paper) throw new ApiError(404, 'Paper not found');
    res.json(new ApiResponse(paper, 'Paper approved'));
  } catch (err) {
    next(err);
  }
};

// Reject a paper with reason
export const rejectPaper = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const paper = await Paper.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', rejectionReason: reason },
      { new: true }
    );
    if (!paper) throw new ApiError(404, 'Paper not found');
    res.json(new ApiResponse(paper, 'Paper rejected'));
  } catch (err) {
    next(err);
  }
};