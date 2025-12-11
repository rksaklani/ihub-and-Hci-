const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email });

    if (existingSubscription) {
      if (existingSubscription.status === 'subscribed') {
        return res.status(400).json({
          success: false,
          message: 'Email is already subscribed to newsletter'
        });
      } else {
        // Re-subscribe if previously unsubscribed
        existingSubscription.status = 'subscribed';
        existingSubscription.subscribedAt = new Date();
        await existingSubscription.save();

        return res.status(200).json({
          success: true,
          message: 'Successfully re-subscribed to newsletter'
        });
      }
    }

    // Create new subscription
    const subscription = await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Unsubscribe from newsletter
// @route   PUT /api/newsletter/unsubscribe
// @access  Public
exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const subscription = await Newsletter.findOne({ email });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in subscription list'
      });
    }

    subscription.status = 'unsubscribed';
    await subscription.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all newsletter subscriptions
// @route   GET /api/newsletter
// @access  Private/Admin
exports.getAllSubscriptions = async (req, res) => {
  try {
    const { status, limit = 100 } = req.query;

    let query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    const subscriptions = await Newsletter.find(query)
      .sort({ subscribedAt: -1 })
      .limit(parseInt(limit));

    const total = await Newsletter.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      count: subscriptions.length,
      data: subscriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete newsletter subscription
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin
exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Newsletter.findByIdAndDelete(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subscription deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
