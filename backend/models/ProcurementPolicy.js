const mongoose = require('mongoose');

const procurementPolicySchema = new mongoose.Schema({
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

procurementPolicySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('ProcurementPolicy', procurementPolicySchema);

