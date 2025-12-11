const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllProposals,
  getProposal,
  createProposal,
  updateProposal,
  deleteProposal,
  getAllFellowships,
  getFellowship,
  createFellowship,
  updateFellowship,
  deleteFellowship,
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

// Call for Proposals - Public routes
router.get('/proposals', getAllProposals);
router.get('/proposals/:id', getProposal);

// Call for Proposals - Protected routes
router.post('/proposals', protect, authorize('admin'), createProposal);
router.put('/proposals/:id', protect, authorize('admin'), updateProposal);
router.delete('/proposals/:id', protect, authorize('admin'), deleteProposal);

// Fellowships - Public routes
router.get('/fellowships', getAllFellowships);
router.get('/fellowships/:id', getFellowship);

// Fellowships - Protected routes
router.post('/fellowships', protect, authorize('admin'), createFellowship);
router.put('/fellowships/:id', protect, authorize('admin'), updateFellowship);
router.delete('/fellowships/:id', protect, authorize('admin'), deleteFellowship);

// Ongoing Projects - Public routes
router.get('/ongoing', getAllProjects);
router.get('/ongoing/:id', getProject);

// Ongoing Projects - Protected routes
router.post('/ongoing', protect, authorize('admin'), createProject);
router.put('/ongoing/:id', protect, authorize('admin'), updateProject);
router.delete('/ongoing/:id', protect, authorize('admin'), deleteProject);

module.exports = router;

