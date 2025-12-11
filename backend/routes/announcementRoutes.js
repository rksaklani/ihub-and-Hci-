const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { protect, authorize } = require('../middleware/auth');
const {
  getAllAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllers/announcementController');

// Validation rules
const announcementValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Announcement title is required')
];

// Public routes
router.get('/', getAllAnnouncements);
router.get('/:id', getAnnouncement);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), announcementValidation, validate, createAnnouncement);
router.put('/:id', protect, authorize('admin'), updateAnnouncement);
router.delete('/:id', protect, authorize('admin'), deleteAnnouncement);

module.exports = router;
