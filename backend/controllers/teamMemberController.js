const BoardMember = require('../models/BoardMember');
const Advisor = require('../models/Advisor');
const GoverningBodyMember = require('../models/GoverningBodyMember');
const TeamMember = require('../models/TeamMember');
const FacultyProject = require('../models/FacultyProject');
const AffiliatedFaculty = require('../models/AffiliatedFaculty');

// Helper function to create CRUD operations
const createCRUD = (Model, modelName) => ({
  getAll: async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, message: `${modelName} not found` });
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!item) {
        return res.status(404).json({ success: false, message: `${modelName} not found` });
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, message: `${modelName} not found` });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
});

// Board Members
const boardCRUD = createCRUD(BoardMember, 'Board member');
exports.getBoardMembers = boardCRUD.getAll;
exports.getBoardMember = boardCRUD.getById;
exports.createBoardMember = boardCRUD.create;
exports.updateBoardMember = boardCRUD.update;
exports.deleteBoardMember = boardCRUD.delete;

// Advisors
const advisorCRUD = createCRUD(Advisor, 'Advisor');
exports.getAdvisors = advisorCRUD.getAll;
exports.getAdvisor = advisorCRUD.getById;
exports.createAdvisor = advisorCRUD.create;
exports.updateAdvisor = advisorCRUD.update;
exports.deleteAdvisor = advisorCRUD.delete;

// Governing Body Members
const governingBodyCRUD = createCRUD(GoverningBodyMember, 'Governing body member');
exports.getGoverningBodyMembers = governingBodyCRUD.getAll;
exports.getGoverningBodyMember = governingBodyCRUD.getById;
exports.createGoverningBodyMember = governingBodyCRUD.create;
exports.updateGoverningBodyMember = governingBodyCRUD.update;
exports.deleteGoverningBodyMember = governingBodyCRUD.delete;

// Team Members
const teamMemberCRUD = createCRUD(TeamMember, 'Team member');
exports.getTeamMembers = teamMemberCRUD.getAll;
exports.getTeamMember = teamMemberCRUD.getById;
exports.createTeamMember = teamMemberCRUD.create;
exports.updateTeamMember = teamMemberCRUD.update;
exports.deleteTeamMember = teamMemberCRUD.delete;

// Faculty Projects
const facultyProjectCRUD = createCRUD(FacultyProject, 'Faculty project');
exports.getFacultyProjects = facultyProjectCRUD.getAll;
exports.getFacultyProject = facultyProjectCRUD.getById;
exports.createFacultyProject = facultyProjectCRUD.create;
exports.updateFacultyProject = facultyProjectCRUD.update;
exports.deleteFacultyProject = facultyProjectCRUD.delete;

// Affiliated Faculty
const affiliatedFacultyCRUD = createCRUD(AffiliatedFaculty, 'Affiliated faculty');
exports.getAffiliatedFaculty = affiliatedFacultyCRUD.getAll;
exports.getAffiliatedFacultyMember = affiliatedFacultyCRUD.getById;
exports.createAffiliatedFaculty = affiliatedFacultyCRUD.create;
exports.updateAffiliatedFaculty = affiliatedFacultyCRUD.update;
exports.deleteAffiliatedFaculty = affiliatedFacultyCRUD.delete;

