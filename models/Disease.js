const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    symptoms: [
      {
        type: String
      }
    ],

    precautions: [
      {
        type: String
      }
    ],

    medicines: [
      {
        type: String
      }
    ],
    recoveryTips: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Disease",
  diseaseSchema
);