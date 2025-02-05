import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  semester: { type: Number, required: true },
  examType: { type: String, enum: ['mid', 'end'], required: true },
  subject: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Paper', paperSchema);