const mongoose = require('mongoose');

const affiliatedFacultySchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: 'FacultyProject',
    required: [true, 'Project ID is required']
  },
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

affiliatedFacultySchema.index({ name: 1 });
affiliatedFacultySchema.index({ projectId: 1 });

module.exports = mongoose.model('AffiliatedFaculty', affiliatedFacultySchema);

