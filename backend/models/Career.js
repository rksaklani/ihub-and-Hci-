const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  applicationLink: {
    type: String,
    trim: true
  },
  deadline: {
    type: Date
  },
  pdf: {
    type: String
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  }
}, {
  timestamps: true
});

careerSchema.index({ status: 1, deadline: 1 });

module.exports = mongoose.model('Career', careerSchema);

