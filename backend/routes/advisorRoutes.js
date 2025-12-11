const express = require('express');
const {
  getAdvisors,
  getAdvisor,
  createAdvisor,
  updateAdvisor,
  deleteAdvisor
} = require('../controllers/teamMemberController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getAdvisors)
  .post(protect, authorize('admin'), createAdvisor);

router.route('/:id')
  .get(getAdvisor)
  .put(protect, authorize('admin'), updateAdvisor)
  .delete(protect, authorize('admin'), deleteAdvisor);

module.exports = router;

