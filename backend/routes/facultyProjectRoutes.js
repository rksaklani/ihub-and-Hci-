const express = require('express');
const {
  getFacultyProjects,
  getFacultyProject,
  createFacultyProject,
  updateFacultyProject,
  deleteFacultyProject
} = require('../controllers/teamMemberController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getFacultyProjects)
  .post(protect, authorize('admin'), createFacultyProject);

router.route('/:id')
  .get(getFacultyProject)
  .put(protect, authorize('admin'), updateFacultyProject)
  .delete(protect, authorize('admin'), deleteFacultyProject);

module.exports = router;

