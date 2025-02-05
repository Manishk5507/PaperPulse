import { uploadToCloudinary } from "../config/cloudinary.js";
import Paper from "../models/Paper.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const uploadPaper = async (req, res, next) => {
  try {
    const { user } = req;
    const { year, semester, examType, subject } = req.body;

    // Validate file
    if (!req.file) throw new ApiError(400, "No file uploaded");

    // Upload to Cloudinary
    const fileUrl = await uploadToCloudinary(req.file.path);

    // Create paper record
    const paper = await Paper.create({
      year,
      semester,
      examType,
      subject,
      fileUrl,
      uploadedBy: user._id,
      college: user.college,
      status: user.role === "admin" ? "approved" : "pending",
    });

    res
      .status(201)
      .json(
        new ApiResponse(
          paper,
          "Paper uploaded successfully. Awaiting admin approval."
        )
      );
  } catch (err) {
    next(err);
  }
};

export const searchPapers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const query = { status: "approved" };

    // Apply filters
    if (filters.year) query.year = filters.year;
    if (filters.subject)
      query.subject = { $regex: filters.subject, $options: "i" };

    const papers = await Paper.find(query)
      .populate("uploadedBy", "name")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Paper.countDocuments(query);

    res.json(
      new ApiResponse(
        {
          papers,
          total,
          page: Number(page),
          pages: Math.ceil(total / limit),
        },
        "Search results fetched"
      )
    );
  } catch (err) {
    next(err);
  }
};

export const getPapers = async (req, res, next) => {
  try {
    const papers = await Paper.find({ status: "approved" }).populate(
      "uploadedBy",
      "name"
    );
    res.json(new ApiResponse(papers, "Papers fetched"));
  } catch (err) {
    next(err);
  }
};

export const getPaperById = async (req, res, next) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) throw new ApiError(404, "Paper not found");

    res.json(new ApiResponse(paper, "Paper fetched"));
  } catch (err) {
    next(err);
  }
};

export const downloadPaper = async (req, res, next) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) throw new ApiError(404, "Paper not found");

    res.download(paper.fileUrl);
  } catch (err) {
    next(err);
  }
};
