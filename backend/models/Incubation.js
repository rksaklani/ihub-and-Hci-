const mongoose = require('mongoose');

const incubationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Startup name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  link: {
    type: String,
    required: [true, 'Website link is required'],
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

incubationSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Incubation', incubationSchema);

