const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Collaboration title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  link: {
    type: String,
    required: [true, 'Link is required'],
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

collaborationSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Collaboration', collaborationSchema);

