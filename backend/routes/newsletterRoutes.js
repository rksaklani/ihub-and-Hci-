const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { protect, authorize } = require('../middleware/auth');
const {
  subscribe,
  unsubscribe,
  getAllSubscriptions,
  deleteSubscription
} = require('../controllers/newsletterController');

// Validation rules
const emailValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
];

// Public routes
router.post('/', emailValidation, validate, subscribe);
router.put('/unsubscribe', emailValidation, validate, unsubscribe);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), getAllSubscriptions);
router.delete('/:id', protect, authorize('admin'), deleteSubscription);

module.exports = router;
