const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['visits-to-ihub', 'facilities', 'workshops'],
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  date: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

gallerySchema.index({ category: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model('Gallery', gallerySchema);

