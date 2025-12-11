const mongoose = require('mongoose');

const governingBodyMemberSchema = new mongoose.Schema({
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

governingBodyMemberSchema.index({ name: 1 });

module.exports = mongoose.model('GoverningBodyMember', governingBodyMemberSchema);

