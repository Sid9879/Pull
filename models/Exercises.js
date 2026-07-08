const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
    {
         userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        duration: {
            type: String,
            required: [true, "Duration is required"]
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Easy"
        },
        completedToday: {
            type: Boolean,
            default: false
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Exercise", exerciseSchema);    