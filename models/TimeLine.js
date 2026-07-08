const mongoose = require("mongoose")

const timeLineSchema = new mongoose.Schema({
     userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "User ID is required"],
        },
    week: {
        type: String
    },

    title: {
        type: String,
        required: [true, "Title is required"]
    },
    milestones: [{
        type: String,
        required: [true, "Milestone is required"]
    }],
    isCurrentWeek: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })

module.exports = mongoose.model("timeLine", timeLineSchema);
