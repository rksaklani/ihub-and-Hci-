const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required']
  },
  location: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  featuredImage: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
eventSchema.index({ status: 1, eventDate: -1 });
eventSchema.index({ eventDate: 1 });

module.exports = mongoose.model('Event', eventSchema);
