const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  instructor: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

courseSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Course', courseSchema);

