const Product = require("../models/Product")

exports.getPublicProduct = async (req, res) => {
    const result = await Product.find({
        $and: [
            { seller: { $ne: req.loggedInUser } },
            { isSold: false },
        ]
    })
    res.json({ meassage: "get product success", result })

}

exports.getPublicProductDetails = async (req, res) => {
    const result = await Product.findById(req.params.productId).populate("seller")
    res.json({ meassage: "get product detail success", result })

}

