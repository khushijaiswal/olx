const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({

    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },  // buyer => user
    address: { type: String },
    city: { type: String },
    payment: { type: String, default: "COD" },
    // payment: { type: String, required: true, default: "COD"  },
    products: { type: mongoose.Types.ObjectId, ref: "product", required: true },
    status: { type: String, enum: ["placed", "delivered", "cancel"], default: "placed" },

}, { timestamps: true })

module.exports = mongoose.model("order", orderSchema)