const mongoose = require('mongoose');

const ongoingProjectSchema = new mongoose.Schema({
  sno: {
    type: Number,
    required: [true, 'Serial number is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  instituteName: {
    type: String,
    required: [true, 'Institute name is required'],
    trim: true
  },
  principalInvestigator: {
    type: String,
    required: [true, 'Principal investigator is required'],
    trim: true
  },
  coPrincipalInvestigator: {
    type: String,
    trim: true
  },
  amountSanctioned: {
    type: String,
    required: [true, 'Amount sanctioned is required'],
    trim: true
  },
  durationFrom: {
    type: Date,
    required: [true, 'Duration from is required']
  },
  durationTo: {
    type: Date,
    required: [true, 'Duration to is required']
  },
  pdf: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

ongoingProjectSchema.index({ status: 1, durationFrom: 1 });

module.exports = mongoose.model('OngoingProject', ongoingProjectSchema);

