const mongoose = require("mongoose");
const medicationSchema = new mongoose.Schema(
    {
         userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        medicineName: {
            type: String,
            required: [true, "Medicine name is required"],
            trim: true,
        },

        dose: {
            type: String,
            required: [true, "Dose is required"],
            trim: true,
            // Example: 500mg, 1 tablet
        },

        frequency: {
            type: String,
            required: [true, "Frequency is required"],
            enum: [
                "Once a day",
                "Twice a day",
                "Three times a day",
                "Every 4 hours",
                "Every 6 hours",
                "Every 8 hours",
                "Weekly",
                "As needed",
            ],
        },

        timing: {
            type: String,
            required: [true, "Timing is required"],
            enum: [
                "With Meals",
                "After Meals",
                "Before Meals",
                "Morning",
                "Afternoon",
                "Evening",
                "Night"
            ],
        },

        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },

        endDate: {
            type: Date,
            required: [true, "End date is required"],
        },
          isCompleted: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Medication", medicationSchema);