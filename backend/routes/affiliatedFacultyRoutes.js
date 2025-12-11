const express = require('express');
const {
  getAffiliatedFaculty,
  getAffiliatedFacultyMember,
  createAffiliatedFaculty,
  updateAffiliatedFaculty,
  deleteAffiliatedFaculty
} = require('../controllers/teamMemberController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getAffiliatedFaculty)
  .post(protect, authorize('admin'), createAffiliatedFaculty);

router.route('/:id')
  .get(getAffiliatedFacultyMember)
  .put(protect, authorize('admin'), updateAffiliatedFaculty)
  .delete(protect, authorize('admin'), deleteAffiliatedFaculty);

module.exports = router;

