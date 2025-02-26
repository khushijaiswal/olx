const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },

    address: { type: String, required: true },
    city: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },

    isActive: { type: Boolean },
    // infoComplete: { type: Boolean, default: false },

    otp: { type: String },
    otpSendOn: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)