const mongoose = require('mongoose');

const fellowshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Fellowship name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  pdf: {
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

fellowshipSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Fellowship', fellowshipSchema);

