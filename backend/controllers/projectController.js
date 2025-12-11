const CallForProposal = require('../models/CallForProposal');
const Fellowship = require('../models/Fellowship');
const OngoingProject = require('../models/OngoingProject');

// Call for Proposals
exports.getAllProposals = async (req, res) => {
  try {
    const { status, limit = 100 } = req.query;
    let query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    const proposals = await CallForProposal.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: proposals.length,
      data: proposals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getProposal = async (req, res) => {
  try {
    const proposal = await CallForProposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: 'Proposal not found'
      });
    }

    res.status(200).json({
      success: true,
      data: proposal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createProposal = async (req, res) => {
  try {
    const proposal = await CallForProposal.create(req.body);

    res.status(201).json({
      success: true,
      data: proposal,
      message: 'Proposal created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateProposal = async (req, res) => {
  try {
    const proposal = await CallForProposal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: 'Proposal not found'
      });
    }

    res.status(200).json({
      success: true,
      data: proposal,
      message: 'Proposal updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteProposal = async (req, res) => {
  try {
    const proposal = await CallForProposal.findByIdAndDelete(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: 'Proposal not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Proposal deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Fellowships
exports.getAllFellowships = async (req, res) => {
  try {
    const { status, limit = 100 } = req.query;
    let query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    const fellowships = await Fellowship.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: fellowships.length,
      data: fellowships
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getFellowship = async (req, res) => {
  try {
    const fellowship = await Fellowship.findById(req.params.id);

    if (!fellowship) {
      return res.status(404).json({
        success: false,
        message: 'Fellowship not found'
      });
    }

    res.status(200).json({
      success: true,
      data: fellowship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createFellowship = async (req, res) => {
  try {
    const fellowship = await Fellowship.create(req.body);

    res.status(201).json({
      success: true,
      data: fellowship,
      message: 'Fellowship created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateFellowship = async (req, res) => {
  try {
    const fellowship = await Fellowship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!fellowship) {
      return res.status(404).json({
        success: false,
        message: 'Fellowship not found'
      });
    }

    res.status(200).json({
      success: true,
      data: fellowship,
      message: 'Fellowship updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteFellowship = async (req, res) => {
  try {
    const fellowship = await Fellowship.findByIdAndDelete(req.params.id);

    if (!fellowship) {
      return res.status(404).json({
        success: false,
        message: 'Fellowship not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Fellowship deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Ongoing Projects
exports.getAllProjects = async (req, res) => {
  try {
    const { status, limit = 100 } = req.query;
    let query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    const projects = await OngoingProject.find(query)
      .sort({ sno: 1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await OngoingProject.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createProject = async (req, res) => {
  try {
    // Auto-generate sno if not provided
    if (!req.body.sno) {
      const maxSno = await OngoingProject.findOne().sort({ sno: -1 });
      req.body.sno = maxSno ? maxSno.sno + 1 : 1;
    }

    const project = await OngoingProject.create(req.body);

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await OngoingProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await OngoingProject.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

