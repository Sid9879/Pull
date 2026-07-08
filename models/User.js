const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      // unique: [true, 'Email already exists'],
    },
    mobile: {
      type: Number,
      // unique: [true, 'mobile already exists'],
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "patient"],
      default: "patient",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference User model
      required: false, // Only required if you want panel permission enforcement
    },

    address: {
      state: {
        type: String,
      },
      zip: {
        type: Number,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
    },
    doctorNo: String,
    dischargeDate: String,
    recovertype: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
