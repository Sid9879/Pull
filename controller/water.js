const BaseController = require('../core/BaseController');
const Water = require('../models/Water');

const waterController = new BaseController(Water,{
    name:"Water & Diet",
    access:"user",
    accessKey:"userId"
});

waterController.addWater = async (req, res) => {
  try {
    const userId = req.user._id;

    const { glass } = req.body;

    if (glass < 0 || glass > 8) {
      return res.status(400).json({
        success: false,
        message: "Glass value must be between 0 and 8",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    let water = await Water.findOne({ userId, date: today });

    if (!water) {
      water = await Water.create({
        userId,
        date: today,
        glass,
      });
    } else {
      water.glass = glass;
      await water.save();
    }

    return res.status(200).json({
      success: true,
      message: "Water intake updated",
      data: water,
      remaining: 8 - water.glass,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


waterController.getTodayWater = async (req, res) => {
  try {
    const userId = req.user._id;

    const today = new Date().toISOString().split("T")[0];

    let water = await Water.findOne({
      userId,
      date: today,
    });

    if (!water) {
      water = await Water.create({
        userId,
        date: today,
        glass: 0,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Today's water intake fetched successfully",
      data: water,
      target: 8,
      completed: water.glass,
      remaining: 8 - water.glass,
      percentage: ((water.glass / 8) * 100).toFixed(0),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = waterController;