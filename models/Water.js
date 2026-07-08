const mongoose = require("mongoose");

const waterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    glass: {
      type: Number,
      default: 0,
      min: [0, "Number of glasses cannot be negative"],
      max: [8, "Maximum 8 glasses allowed per day"],
    },

    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

waterSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Water", waterSchema);