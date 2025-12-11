const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  dated: {
    type: Date,
    required: [true, 'Dated is required']
  },
  refNo: {
    type: String,
    required: [true, 'Reference number is required'],
    trim: true
  },
  details: {
    type: String,
    required: [true, 'Details are required'],
    trim: true
  },
  dateOfIssue: {
    type: Date,
    required: [true, 'Date of issue is required']
  },
  startDate: {
    type: String,
    required: [true, 'Start date is required'],
    trim: true
  },
  lastDate: {
    type: String,
    required: [true, 'Last date is required'],
    trim: true
  },
  openingDate: {
    type: String,
    required: [true, 'Opening date is required'],
    trim: true
  },
  downloadLink: {
    type: String,
    trim: true
  },
  corrigendumLink: {
    type: String,
    trim: true
  },
  extensionNotice: {
    type: String,
    trim: true
  },
  pdf: {
    type: String
  },
  corrigendumPdf: {
    type: String
  },
  extensionPdf: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  }
}, {
  timestamps: true
});

tenderSchema.index({ status: 1, lastDate: 1 });

module.exports = mongoose.model('Tender', tenderSchema);

