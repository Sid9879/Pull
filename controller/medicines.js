const BaseController = require("../core/BaseController");
const Medicines = require("../models/Medicines");
const config = require("../config")

const MedicinesController = new BaseController(Medicines, {
    name: "Medicines",
    access: "user",
    accessKey: "userId",

    get: {
        pagination: config.pagination,
        searchFields: ["medicineName"],
        populate: [{ path: "userId", select: "name email" }]
    }
});

MedicinesController.updateMedicines = async (req, res) => {
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

    const appointment = await Medicines.findByIdAndUpdate(
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

const adminMedicinesController = new BaseController(Medicines, {
    name: "Medicines",


    get: {
        pagination: config.pagination,
        searchFields: ["medicineName"],
        populate: [{ path: "userId", select: "name email" }]
    }
});

module.exports = {MedicinesController,adminMedicinesController};