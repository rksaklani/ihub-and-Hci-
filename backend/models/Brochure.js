const mongoose = require('mongoose');

const brochureSchema = new mongoose.Schema({
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
    type: String,
    required: [true, 'PDF is required']
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

brochureSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Brochure', brochureSchema);

