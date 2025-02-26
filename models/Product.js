const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    seller: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    productImg: { type: [String], required: true },
    quantity: { type: Number, required: true },
    isSold: { type: Boolean, default: false },

})

module.exports = mongoose.model("product", productSchema)