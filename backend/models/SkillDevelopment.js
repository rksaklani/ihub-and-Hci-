const mongoose = require('mongoose');

const skillDevelopmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['pmkvy', 'hpkvn', 'job-role', 'webinar-workshop', 'past-activity'],
    trim: true
  },
  // PMKVY fields
  description1: {
    type: String,
    trim: true
  },
  description2: {
    type: String,
    trim: true
  },
  // HPKVN fields
  description: {
    type: String,
    trim: true
  },
  // Common fields
  title: {
    type: String,
    trim: true
  },
  readMoreLink: {
    type: String,
    trim: true
  },
  applicationLink: {
    type: String,
    trim: true
  },
  pdf: {
    type: String
  },
  image: {
    type: String
  },
  link: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

skillDevelopmentSchema.index({ type: 1, status: 1 });

module.exports = mongoose.model('SkillDevelopment', skillDevelopmentSchema);

