const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAll,
  getOne,
  create,
  update,
  delete: deleteItem
} = require('../controllers/visitController');

// Public route for creating visit requests
router.post('/', create);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), getAll);
router.get('/:id', protect, authorize('admin'), getOne);
router.put('/:id', protect, authorize('admin'), update);
router.delete('/:id', protect, authorize('admin'), deleteItem);

module.exports = router;

