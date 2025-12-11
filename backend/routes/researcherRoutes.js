const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { protect, authorize } = require('../middleware/auth');
const {
  getAllResearchers,
  getResearcher,
  createResearcher,
  updateResearcher,
  deleteResearcher
} = require('../controllers/teamController');

// Validation rules
const researcherValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Researcher name is required')
];

// Public routes
router.get('/', getAllResearchers);
router.get('/:id', getResearcher);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), researcherValidation, validate, createResearcher);
router.put('/:id', protect, authorize('admin'), updateResearcher);
router.delete('/:id', protect, authorize('admin'), deleteResearcher);

module.exports = router;
