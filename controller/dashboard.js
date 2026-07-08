const User = require("../models/User");
const Appointment = require("../models/Appointments");
const Medication = require("../models/Medicines");
const Water = require("../models/Water");
const Exercise = require("../models/Exercises");
const MentalHealth = require("../models/MentalHealth");

const dashboardController = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Recovery Days
    const user = await User.findById(userId);
    let recoveryDays = 1;
    if (user && user.dischargeDate) {
      const dischargeDate = new Date(user.dischargeDate);
      const todayDate = new Date();
      // Calculate difference in days, if valid
      if (!isNaN(dischargeDate.getTime())) {
        const diffTime = todayDate - dischargeDate;
        recoveryDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (recoveryDays < 1) recoveryDays = 1; // Minimum 1 day
      }
    }

    // 2. Meds today
    const medsTodayCount = await Medication.countDocuments({
      userId,
      isCompleted: false, // assuming not completed means taking it today
    });

   
    const todayStr = new Date().toISOString().split("T")[0];
    let waterDoc = await Water.findOne({ userId, date: todayStr });
    const glassesOfWater = waterDoc ? waterDoc.glass : 0;
    const waterGoal = 8;

  
    const upcomingApptsCount = await Appointment.countDocuments({
      userId,
      isCompleted: false,
    });

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        recoveryDays,
        medsToday: medsTodayCount,
        glassesOfWater: {
          consumed: glassesOfWater,
          goal: waterGoal,
        },
        upcomingAppts: upcomingApptsCount,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};

const checklistDashboardController = async (req, res) => {
  try {
    const userId = req.user._id;
    const todayStr = new Date().toISOString().split("T")[0];
    
    // 1. Medications taken (completed / total)
    // Here we count all meds for user. (Assuming total meds they should take)
    const totalMeds = await Medication.countDocuments({ userId });
    const completedMeds = await Medication.countDocuments({ userId, isCompleted: true });

    // 2. Water intake
    let waterDoc = await Water.findOne({ userId, date: todayStr });
    const glassesOfWater = waterDoc ? waterDoc.glass : 0;
    const waterGoal = 8; // From screenshot

    // 3. Exercises done
    const totalExercises = await Exercise.countDocuments({ userId });
    const completedExercises = await Exercise.countDocuments({ userId, completedToday: true });

    // 4. Mood checked in
    // Check if there's a mental health entry created today
    const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));
    const endOfToday = new Date(new Date().setHours(23, 59, 59, 999));
    
    const moodCheckin = await MentalHealth.findOne({
      userId,
      createdAt: { $gte: startOfToday, $lte: endOfToday }
    });
    
    const moodStatus = moodCheckin ? "Checked in" : "Not yet";

    return res.status(200).json({
      success: true,
      message: "Checklist dashboard data fetched successfully",
      data: {
        medications: {
          completed: completedMeds,
          total: totalMeds
        },
        water: {
          consumed: glassesOfWater,
          goal: waterGoal
        },
        exercises: {
          completed: completedExercises,
          total: totalExercises
        },
        mood: {
          status: moodStatus
        }
      },
    });
  } catch (error) {
    console.error("Checklist Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch checklist dashboard data",
      error: error.message,
    });
  }
};

module.exports = { dashboardController, checklistDashboardController };