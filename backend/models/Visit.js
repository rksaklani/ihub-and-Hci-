const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  organization: {
    type: String,
    trim: true
  },
  purpose: {
    type: String,
    required: [true, 'Purpose is required'],
    trim: true
  },
  preferredDate: {
    type: Date
  },
  preferredTime: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

visitSchema.index({ status: 1, preferredDate: 1 });

module.exports = mongoose.model('Visit', visitSchema);

