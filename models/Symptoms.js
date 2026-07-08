const mongoose = require("mongoose");

const symptomsSchema = new mongoose.Schema(
    {
         userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "User ID is required"],
        },
        painLevel: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
        },

        temperature: {
            type: Number,
            // Example: 37.5
        },
        general: [String],

        headAndNeurological: [String],

        chestAndBreathing: [String],

        stomachAndDigestive: [String],

        skinAndWound: [String],

        limbsAndMovement: [String],

        UrinaryAndOther: [String],

        mood: {
            type: String,

            enum: ["Good", "Neutral", "Low", "Pain", "Tired"],

            default: "Neutral",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Symptoms", symptomsSchema);