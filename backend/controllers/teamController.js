const Faculty = require('../models/Faculty');
const Researcher = require('../models/Researcher');
const Staff = require('../models/Staff');

// FACULTY CONTROLLERS

// @desc    Get all faculty members
// @route   GET /api/faculty
// @access  Public
exports.getAllFaculty = async (req, res) => {
  try {
    const { limit = 100, category, search } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }

    const faculty = await Faculty.find(query)
      .sort({ name: 1 })
      .limit(parseInt(limit));

    const total = await Faculty.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      count: faculty.length,
      data: faculty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single faculty member
// @route   GET /api/faculty/:id
// @access  Public
exports.getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: faculty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new faculty member
// @route   POST /api/faculty
// @access  Private/Admin
exports.createFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);

    res.status(201).json({
      success: true,
      data: faculty,
      message: 'Faculty member created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update faculty member
// @route   PUT /api/faculty/:id
// @access  Private/Admin
exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: faculty,
      message: 'Faculty member updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete faculty member
// @route   DELETE /api/faculty/:id
// @access  Private/Admin
exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Faculty member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// RESEARCHER CONTROLLERS

// @desc    Get all researchers
// @route   GET /api/researchers
// @access  Public
exports.getAllResearchers = async (req, res) => {
  try {
    const { limit = 100, category, search } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { researchArea: { $regex: search, $options: 'i' } }
      ];
    }

    const researchers = await Researcher.find(query)
      .sort({ name: 1 })
      .limit(parseInt(limit));

    const total = await Researcher.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      count: researchers.length,
      data: researchers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single researcher
// @route   GET /api/researchers/:id
// @access  Public
exports.getResearcher = async (req, res) => {
  try {
    const researcher = await Researcher.findById(req.params.id);

    if (!researcher) {
      return res.status(404).json({
        success: false,
        message: 'Researcher not found'
      });
    }

    res.status(200).json({
      success: true,
      data: researcher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new researcher
// @route   POST /api/researchers
// @access  Private/Admin
exports.createResearcher = async (req, res) => {
  try {
    const researcher = await Researcher.create(req.body);

    res.status(201).json({
      success: true,
      data: researcher,
      message: 'Researcher created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update researcher
// @route   PUT /api/researchers/:id
// @access  Private/Admin
exports.updateResearcher = async (req, res) => {
  try {
    const researcher = await Researcher.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!researcher) {
      return res.status(404).json({
        success: false,
        message: 'Researcher not found'
      });
    }

    res.status(200).json({
      success: true,
      data: researcher,
      message: 'Researcher updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete researcher
// @route   DELETE /api/researchers/:id
// @access  Private/Admin
exports.deleteResearcher = async (req, res) => {
  try {
    const researcher = await Researcher.findByIdAndDelete(req.params.id);

    if (!researcher) {
      return res.status(404).json({
        success: false,
        message: 'Researcher not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Researcher deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// STAFF CONTROLLERS

// @desc    Get all staff members
// @route   GET /api/staff
// @access  Public
exports.getAllStaff = async (req, res) => {
  try {
    const { limit = 100, category, search } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }

    const staff = await Staff.find(query)
      .sort({ name: 1 })
      .limit(parseInt(limit));

    const total = await Staff.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      count: staff.length,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single staff member
// @route   GET /api/staff/:id
// @access  Public
exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new staff member
// @route   POST /api/staff
// @access  Private/Admin
exports.createStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);

    res.status(201).json({
      success: true,
      data: staff,
      message: 'Staff member created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update staff member
// @route   PUT /api/staff/:id
// @access  Private/Admin
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: staff,
      message: 'Staff member updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete staff member
// @route   DELETE /api/staff/:id
// @access  Private/Admin
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Staff member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
