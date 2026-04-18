
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true 
  },

  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true, 
    index: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true, 
    index: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
   
  },

  refreshToken: { type: String },

  lastLogin: { type: Date }

}, { timestamps: true });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw error;
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    name: this.name
  },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_EXPIRY }
  );
};

userSchema.index({ name: 'text', username: 'text' });

export const User = mongoose.model("User", userSchema);
