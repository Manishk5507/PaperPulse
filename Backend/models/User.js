import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email']
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'contributor', 'admin'], default: 'student' },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  verified: { type: Boolean, default: false },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: { type: Date, default: Date.now }
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Password comparison method
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);