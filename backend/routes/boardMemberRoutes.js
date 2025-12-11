const express = require('express');
const {
  getBoardMembers,
  getBoardMember,
  createBoardMember,
  updateBoardMember,
  deleteBoardMember
} = require('../controllers/teamMemberController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getBoardMembers)
  .post(protect, authorize('admin'), createBoardMember);

router.route('/:id')
  .get(getBoardMember)
  .put(protect, authorize('admin'), updateBoardMember)
  .delete(protect, authorize('admin'), deleteBoardMember);

module.exports = router;

