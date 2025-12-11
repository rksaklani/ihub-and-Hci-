const mongoose = require('mongoose');

const callForInnovationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  deadline: {
    type: Date
  },
  link: {
    type: String,
    trim: true
  },
  pdf: {
    type: String
  },
  image: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  }
}, {
  timestamps: true
});

callForInnovationSchema.index({ status: 1, deadline: 1 });

module.exports = mongoose.model('CallForInnovation', callForInnovationSchema);

