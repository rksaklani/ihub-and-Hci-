const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAll,
  getOne,
  create,
  update,
  delete: deleteItem
} = require('../controllers/pressController');

// Public routes
router.get('/', getAll);
router.get('/:id', getOne);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), create);
router.put('/:id', protect, authorize('admin'), update);
router.delete('/:id', protect, authorize('admin'), deleteItem);

module.exports = router;

