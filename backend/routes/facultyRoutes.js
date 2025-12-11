const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { protect, authorize } = require('../middleware/auth');
const {
  getAllFaculty,
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty
} = require('../controllers/teamController');

// Validation rules
const facultyValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Faculty name is required')
];

// Public routes
router.get('/', getAllFaculty);
router.get('/:id', getFaculty);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), facultyValidation, validate, createFaculty);
router.put('/:id', protect, authorize('admin'), updateFaculty);
router.delete('/:id', protect, authorize('admin'), deleteFaculty);

module.exports = router;
