const BaseController = require('../core/BaseController');
const Appointment = require('../models/Appointments');

const appointments = new BaseController(Appointment,{
    name:"Your Appointments",
    access:"user",
    accessKey:"userId"
});

appointments.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    const updateData = {
      isCompleted,
    };

    // ✅ if completed set current datetime
    if (isCompleted) {
      updateData.completedAt = new Date();
    } else {
      updateData.completedAt = null;
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = appointments;