const Incubation = require('../models/Incubation');
const IncubationCategory = require('../models/IncubationCategory');

// Incubation CRUD
exports.getAllStartups = async (req, res) => {
  try {
    const { category, status, limit = 100 } = req.query;
    let query = {};

    if (category) query.category = category;
    if (status && status !== 'all') query.status = status;

    const startups = await Incubation.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: startups.length,
      data: startups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getStartup = async (req, res) => {
  try {
    const startup = await Incubation.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'Startup not found'
      });
    }

    res.status(200).json({
      success: true,
      data: startup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createStartup = async (req, res) => {
  try {
    const startup = await Incubation.create(req.body);

    res.status(201).json({
      success: true,
      data: startup,
      message: 'Startup created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateStartup = async (req, res) => {
  try {
    const startup = await Incubation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'Startup not found'
      });
    }

    res.status(200).json({
      success: true,
      data: startup,
      message: 'Startup updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteStartup = async (req, res) => {
  try {
    const startup = await Incubation.findByIdAndDelete(req.params.id);

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'Startup not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Startup deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Category CRUD
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await IncubationCategory.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await IncubationCategory.create(req.body);

    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    // Check if any startup is using this category
    const startupsUsingCategory = await Incubation.countDocuments({ category: req.params.name });

    if (startupsUsingCategory > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. ${startupsUsingCategory} startup(s) are using it.`
      });
    }

    const category = await IncubationCategory.findOneAndDelete({ name: req.params.name });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

