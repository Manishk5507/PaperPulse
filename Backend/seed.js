import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import College from "./models/College.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");

    // Seed Colleges
    const colleges = [{ name: "IIIT Lucknow", domain: "iiitl.ac.in" }];

    for (const college of colleges) {
      await College.findOneAndUpdate({ domain: college.domain }, college, {
        upsert: true,
        new: true,
      });
    }
    console.log("Colleges seeded");

    // Seed Admin
    const adminCollege = await College.findOne({ domain: "iiitl.ac.in" });
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.findOneAndUpdate(
      { email: "admin@mit.edu" },
      {
        name: "Manish",
        email: "admin@iiitl.ac.in",
        password: hashedPassword,
        role: "admin",
        college: adminCollege._id,
        verified: true,
      },
      { upsert: true }
    );
    console.log("Admin user seeded");

    // Close connection
    await mongoose.disconnect();
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedDatabase();
