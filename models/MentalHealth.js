const mongoose = require("mongoose");

const mentalHealthSchema = new mongoose.Schema(
    {
         userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "User ID is required"],
        },
        mood: {
            type: String,
            required: [true, "Mood is required"],
            enum: ["Great","Good","Okay","Low","Sad","Anxious"],
            default: "Neutral"
        },
        sleepQuality: {
            type: Number,
            min:1,
            max:10,
            required: [true, "Sleep quality is required"]
        },
        notes: {
            type: String,
                trim: true,
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("MentalHealth", mentalHealthSchema);
