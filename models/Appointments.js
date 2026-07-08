const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User ID is required"],
    },

    doctorName: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },

    specialty: {
      type: String,
      required: [true, "Specialty is required"],
      trim: true,
    },

    hospitalOrClinic: {
      type: String,
      trim: true,
      required: [true, "Hospital or clinic is required"]
    },

    Date: {
      type: Date,
      required: [true, "Date is required"],
    },

    Time: {
      type: String,
      required: [true, "Time is required"],
    },

    notes: {
      type: String,
      trim: true,
    },

    // ✅ Appointment completion status
    isCompleted: {
      type: Boolean,
      default: false,
    },

    // ✅ Optional completion date
    completedAt: {
      type: Date,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);