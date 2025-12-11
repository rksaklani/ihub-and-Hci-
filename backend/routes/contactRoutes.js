const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { protect, authorize } = require('../middleware/auth');
const {
  submitContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
];

// Public routes
router.post('/', contactValidation, validate, submitContact);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), getAllContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id', protect, authorize('admin'), updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router;
