const Brochure = require('../models/Brochure');

exports.getAll = async (req, res) => {
  try {
    const { status, limit = 100, search } = req.query;
    let query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const brochures = await Brochure.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: brochures.length,
      data: brochures
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
    const brochure = await Brochure.findById(req.params.id);

    if (!brochure) {
      return res.status(404).json({
        success: false,
        message: 'Brochure not found'
      });
    }

    res.status(200).json({
      success: true,
      data: brochure
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
    const brochure = await Brochure.create(req.body);

    res.status(201).json({
      success: true,
      data: brochure,
      message: 'Brochure created successfully'
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
    const brochure = await Brochure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!brochure) {
      return res.status(404).json({
        success: false,
        message: 'Brochure not found'
      });
    }

    res.status(200).json({
      success: true,
      data: brochure,
      message: 'Brochure updated successfully'
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
    const brochure = await Brochure.findByIdAndDelete(req.params.id);

    if (!brochure) {
      return res.status(404).json({
        success: false,
        message: 'Brochure not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Brochure deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

