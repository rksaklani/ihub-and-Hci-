const mongoose = require('mongoose');

const advisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  linkedinUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please use a valid URL']
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

advisorSchema.index({ name: 1 });

module.exports = mongoose.model('Advisor', advisorSchema);

