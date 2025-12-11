const express = require('express');
const {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} = require('../controllers/teamMemberController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getTeamMembers)
  .post(protect, authorize('admin'), createTeamMember);

router.route('/:id')
  .get(getTeamMember)
  .put(protect, authorize('admin'), updateTeamMember)
  .delete(protect, authorize('admin'), deleteTeamMember);

module.exports = router;

