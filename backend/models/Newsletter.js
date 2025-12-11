const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Newsletter title is required'],
    trim: true
  },
  pdf: {
    type: String
  },
  image: {
    type: String
  },
  link: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published'
  }
}, {
  timestamps: true
});

newsletterSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Newsletter', newsletterSchema);
