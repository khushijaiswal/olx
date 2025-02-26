const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");


exports.AdminAllUsers = expressAsyncHandler(async (req, res) => {
    const result = await User.find()
        .select("-createdAt -updatedAt -__v -password -otp -otpSendOn")
        .sort({ createdAt: -1 })
    return res.json({ message: "All users fetch success", result })
})


exports.getAdminProducts = async (req, res) => {
    const result = await Product.find().populate("seller", "_id name email mobile")
    // const buyerDetails = await Order.find().populate("user", "_id name email mobile")
    // res.json({ meassage: "get product success", result, buyerDetails })
    res.json({ meassage: "get product success", result })

}

exports.getAdminOrders = async (req, res) => {
    // const result = await Product.find().populate("seller", "_id name email mobile")
    const result = await Order.find()
        .populate("user", "_id name email mobile")
        .populate("products", "seller productImg")
        // .populate("products.seller",)
        .populate({
            path: "products",
            populate: {
                path: "seller"
            }
        })
    res.json({ meassage: "get product success", result })
    // res.json({ meassage: "get product success", result })

}

// exports.adminUserFetch = async (req, res) => {
//     try {
//         const total = await User.countDocuments()
//         const { skip, limit } = req.query
//         const result = await User.find().skip(skip).limit(limit)
//         res.json({ message: "User fetch success", result, total })
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({ message: "something went wrong" })
//     }
// }

exports.adminBlockUnblockUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.uid, { isActive: req.body.isActive })
        res.json({ message: "Account block success" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "something went wrong" })
    }
}