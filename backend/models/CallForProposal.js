const mongoose = require('mongoose');

const callForProposalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Proposal name is required'],
    trim: true
  },
  currentDate: {
    type: Date,
    required: [true, 'Current date is required']
  },
  lastDateToApply: {
    type: Date,
    required: [true, 'Last date to apply is required']
  },
  pdf: {
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

callForProposalSchema.index({ status: 1, lastDateToApply: 1 });

module.exports = mongoose.model('CallForProposal', callForProposalSchema);

