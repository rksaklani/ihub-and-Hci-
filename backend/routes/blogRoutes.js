const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { protect, authorize } = require('../middleware/auth');
const {
  getAllBlogs,
  getBlog,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

// Validation rules
const blogValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Blog title is required'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Blog content is required')
];

// Public routes
router.get('/', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlog);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), blogValidation, validate, createBlog);
router.put('/:id', protect, authorize('admin'), updateBlog);
router.delete('/:id', protect, authorize('admin'), deleteBlog);

module.exports = router;
