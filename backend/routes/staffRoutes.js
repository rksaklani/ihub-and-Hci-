const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { protect, authorize } = require('../middleware/auth');
const {
  getAllStaff,
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff
} = require('../controllers/teamController');

// Validation rules
const staffValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Staff name is required')
];

// Public routes
router.get('/', getAllStaff);
router.get('/:id', getStaff);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), staffValidation, validate, createStaff);
router.put('/:id', protect, authorize('admin'), updateStaff);
router.delete('/:id', protect, authorize('admin'), deleteStaff);

module.exports = router;
