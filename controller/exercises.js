const BaseController = require('../core/BaseController');
const Exercise = require('../models/Exercises');

const exercises = new BaseController(Exercise,{
    name:"Your Exercises",
    access:"user",
    accessKey:"userId"
});

// POST /patient/exercises

exercises.createExercise = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      difficulty,
      completedToday
    } = req.body;

    const existingExercise = await Exercise.findOne({
      userId: req.user._id,
      title
    });

    // If already exists -> update completedToday
    if (existingExercise) {
      existingExercise.completedToday = completedToday;
      await existingExercise.save();

      return res.status(200).json({
        message: 'Exercise updated successfully',
        data: existingExercise
      });
    }

    const exercise = await Exercise.create({
      userId: req.user._id,
      title,
      description,
      duration,
      difficulty,
      completedToday
    });

    res.status(201).json({
      message: 'Exercise created successfully',
      data: exercise
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET /patient/exercises

exercises.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Exercises fetched successfully',
      data: exercises
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = exercises;