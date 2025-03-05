const expressAsyncHandler = require("express-async-handler")
const Order = require("../models/Order")
const Product = require("../models/Product")
// const user = require("../models/user")
const cloud = require("../utils/cloudinary")
const { sendEmail } = require("../utils/email")
const { upload } = require("../utils/upload")
const path = require("path")

// product crud
exports.addProduct = async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "unable to upload" })
        }

        if (req.files) {

            // const allImages = []
            // for (const item of req.files) {
            //     const { secure_url } = await cloud.uploader.upload(item.path)
            //     allImages.push(secure_url)
            // }
            // console.log(allImages)

            //promise all start
            const allImages = []
            const heros = []
            for (const item of req.files) {    //loop mein kabhi bhi promises ka code nhi likhte isliye allImages ka empty array ka variable banaya
                allImages.push(cloud.uploader.upload(item.path))
            }
            const data = await Promise.all(allImages)
            for (const item of data) {
                heros.push(item.secure_url)
            }
            //promise all end

            const result = await Product.create({ ...req.body, productImg: heros, seller: req.loggedInUser })
            res.json({ meassage: "add Product success", result })
        } else {
            res.status(400).json({ message: "Product img is required", result })
        }
        // console.log(req.body)
        // console.log(req.file)  //multer.single()
        // console.log(req.files)  // //multer.array()
    })
}

exports.getProduct = async (req, res) => {
    const result = await Product.find({ seller: req.loggedInUser })
    // const result = await Product.find()
    // console.log(isSold)
    res.json({ meassage: "get Product success", result })

}

exports.updateProduct = async (req, res) => {
    upload(req, res, async err => {
        try {
            const allImages = []
            if (req.files && req.files.length > 0) {
                // upload new image
                for (const item of req.files) {
                    const { secure_url } = await cloud.uploader.upload(item.path)
                    allImages.push(secure_url)
                }
            }
            const oldProduct = await Product.findById(req.params._id)
            if (req.body.remove) {
                // remove image
                const result = oldProduct.productImg.filter(item => !req.body.remove.includes(item))
                oldProduct.productImg = result
                if (typeof req.body.remove === 'string') {  //req.body.remove mein string aaya to ye code run hoga (single image to remove)
                    await cloud.uploader.destroy(path.basename(req.body.remove, path.extname(req.body.remove)))
                } else { //req.body.remove mein array aya to ye code run hoga (multiple image to remove)
                    for (const item of req.body.remove) {
                        await cloud.uploader.destroy(path.basename(item, path.extname(item)))
                    }
                }
            }
            console.log(allImages)
            // change only data
            await Product.findByIdAndUpdate(req.params._id, { ...req.body, productImg: [...oldProduct.productImg, ...allImages] })
            res.json({ meassage: "update Product success" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "something went wrong" })
        }
    })

}

exports.deleteProduct = async (req, res) => {
    const result = await Product.findById(req.params._id)
    // step 1 delete from cloudianry
    for (const item of result.productImg) {
        await cloud.uploader.destroy(path.basename(item, path.extname(item)))  //path.extname(item) ==> removes extension of the item
    }
    // step 2 delete from database
    await Product.findByIdAndDelete(req.params._id)
    res.json({ meassage: "delete Product success" })
}



exports.placeOrder = async (req, res) => {
    try {
        const orderData = await Order.create({
            user: req.loggedInUser,
            products: req.body.products,
        })
        const product_id = req.body.products;


        await Product.findByIdAndUpdate(
            product_id,  // Find product by its ID
            { isSold: true }  // Set 'isSold' to true
        );
        // await Product.updateOne(
        //     { _id: product_id },  // Find product by its ID
        //     { $set: { isSold: true } }  // Set 'isSold' to true
        // );

        res.json({ message: "order placed success", orderData })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "unable to place order" })
    }
}



// ye function jo logged in user hai uske product user dashboard pr dikhega. wahi product jo usne add kiye

exports.getProduct_LoggedInUser = async (req, res) => {
    // const result = await Product.find({
    //     $and: [
    //         { seller: { $ne: req.loggedInUser } },
    //         { isSold: false },
    //     ]
    // })
    const result = await Product.find({ seller: req.loggedInUser, isSold: false })
    res.json({ meassage: "get own product success", result })

}



// user navbar mein buyed products - tab bhi kaam aayega ye 
exports.fetchUserOrder = async (req, res) => {
    try {
        const result = await Order
            .find({ user: req.loggedInUser })
            // .findById(req.params.productId)
            .populate("user", "_id name email address city payment")
            .populate("products", "-quantity -__v")
        res.json({ message: "order fetch success", result })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "unable to fetch order" })
    }
}
exports.fetchSoldProducts = async (req, res) => {
    try {
        const result = await Product.find({ seller: req.loggedInUser, isSold: true })
        // .findById(req.params.productId)
        // .populate("user", "_id name email address city payment")
        // .populate("products", "-quantity -__v")
        res.json({ message: "Sold product fetch success", result })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "unable to fetch order" })
    }
}

