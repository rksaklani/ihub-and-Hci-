const AuditReport = require('../models/AuditReport');

exports.getAll = async (req, res) => {
  try {
    const { status, session, limit = 100 } = req.query;
    let query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (session) {
      query.session = session;
    }

    const reports = await AuditReport.find(query)
      .sort({ session: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const report = await AuditReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Audit report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const report = await AuditReport.create(req.body);

    res.status(201).json({
      success: true,
      data: report,
      message: 'Audit report created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const report = await AuditReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Audit report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: report,
      message: 'Audit report updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const report = await AuditReport.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Audit report not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Audit report deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

