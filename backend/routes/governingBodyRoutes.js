const express = require('express');
const {
  getGoverningBodyMembers,
  getGoverningBodyMember,
  createGoverningBodyMember,
  updateGoverningBodyMember,
  deleteGoverningBodyMember
} = require('../controllers/teamMemberController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getGoverningBodyMembers)
  .post(protect, authorize('admin'), createGoverningBodyMember);

router.route('/:id')
  .get(getGoverningBodyMember)
  .put(protect, authorize('admin'), updateGoverningBodyMember)
  .delete(protect, authorize('admin'), deleteGoverningBodyMember);

module.exports = router;

