const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Faculty name is required'],
    trim: true
  },
  designation: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    researchGate: String,
    googleScholar: String
  }
}, {
  timestamps: true
});

// Index for better query performance
facultySchema.index({ name: 1 });
facultySchema.index({ category: 1 });

module.exports = mongoose.model('Faculty', facultySchema);
