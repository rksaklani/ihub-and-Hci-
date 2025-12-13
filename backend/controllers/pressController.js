const Press = require('../models/Press');

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

    const press = await Press.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: press.length,
      data: press
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
    const press = await Press.findById(req.params.id);

    if (!press) {
      return res.status(404).json({
        success: false,
        message: 'Press release not found'
      });
    }

    res.status(200).json({
      success: true,
      data: press
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
    const press = await Press.create(req.body);

    res.status(201).json({
      success: true,
      data: press,
      message: 'Press release created successfully'
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
    const press = await Press.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!press) {
      return res.status(404).json({
        success: false,
        message: 'Press release not found'
      });
    }

    res.status(200).json({
      success: true,
      data: press,
      message: 'Press release updated successfully'
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
    const press = await Press.findByIdAndDelete(req.params.id);

    if (!press) {
      return res.status(404).json({
        success: false,
        message: 'Press release not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Press release deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

