const mongoose = require('mongoose');

const boardMemberSchema = new mongoose.Schema({
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

boardMemberSchema.index({ name: 1 });

module.exports = mongoose.model('BoardMember', boardMemberSchema);

