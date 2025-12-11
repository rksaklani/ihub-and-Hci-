const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Workshop title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date
  },
  location: {
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
    enum: ['upcoming', 'completed', 'cancelled'],
    default: 'upcoming'
  }
}, {
  timestamps: true
});

workshopSchema.index({ status: 1, date: 1 });

module.exports = mongoose.model('Workshop', workshopSchema);

