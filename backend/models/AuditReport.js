const mongoose = require('mongoose');

const auditReportSchema = new mongoose.Schema({
  session: {
    type: String,
    required: [true, 'Session is required'],
    trim: true
  },
  pdf: {
    type: String,
    required: [true, 'PDF is required']
  },
  fileName: {
    type: String,
    required: [true, 'File name is required'],
    trim: true
  },
  fileSize: {
    type: Number,
    required: [true, 'File size is required']
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

auditReportSchema.index({ session: 1, status: 1 });

module.exports = mongoose.model('AuditReport', auditReportSchema);

