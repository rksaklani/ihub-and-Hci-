const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'News title is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  description: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    trim: true
  },
  author: {
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
    enum: ['published', 'draft'],
    default: 'published'
  }
}, {
  timestamps: true
});

newsSchema.index({ status: 1, date: -1 });

module.exports = mongoose.model('News', newsSchema);

