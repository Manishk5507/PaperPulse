import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  domain: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('College', collegeSchema);