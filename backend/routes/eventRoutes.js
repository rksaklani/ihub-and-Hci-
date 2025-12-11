const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { protect, authorize } = require('../middleware/auth');
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

// Validation rules
const eventValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Event title is required'),
  body('eventDate')
    .notEmpty()
    .withMessage('Event date is required')
    .isISO8601()
    .withMessage('Please provide a valid date')
];

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEvent);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), eventValidation, validate, createEvent);
router.put('/:id', protect, authorize('admin'), updateEvent);
router.delete('/:id', protect, authorize('admin'), deleteEvent);

module.exports = router;
