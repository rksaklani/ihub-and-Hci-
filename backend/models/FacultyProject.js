const mongoose = require('mongoose');

const facultyProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

facultyProjectSchema.index({ name: 1 });

module.exports = mongoose.model('FacultyProject', facultyProjectSchema);

