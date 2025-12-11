const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllStartups,
  getStartup,
  createStartup,
  updateStartup,
  deleteStartup,
  getAllCategories,
  createCategory,
  deleteCategory
} = require('../controllers/incubationController');

// Public routes
router.get('/startups', getAllStartups);
router.get('/startups/:id', getStartup);
router.get('/categories', getAllCategories);

// Protected routes (Admin only)
router.post('/startups', protect, authorize('admin'), createStartup);
router.put('/startups/:id', protect, authorize('admin'), updateStartup);
router.delete('/startups/:id', protect, authorize('admin'), deleteStartup);
router.post('/categories', protect, authorize('admin'), createCategory);
router.delete('/categories/:name', protect, authorize('admin'), deleteCategory);

module.exports = router;

