const mongoose = require('mongoose');

const pressSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  pdf: {
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

pressSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Press', pressSchema);

