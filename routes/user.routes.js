const { addProduct, getProduct, deleteProduct, updateProduct, placeOrder, fetchUserOrder, fetchSellerProducts, updateUserInfo, fetchSoldProducts, getProduct_LoggedInUser, } = require("../controller/user.controller")

const router = require("express").Router()
router

    // product CRUD
    .post("/addProduct-user", addProduct)
    .get("/getProduct-user", getProduct)
    .put("/updateProduct-user/:_id", updateProduct)
    .delete("/deleteProduct-user/:_id", deleteProduct)

    // .put("/updateUserInfo", updateUserInfo)

    .post("/place-order", placeOrder)

    .get("/user-own-prooucts", getProduct_LoggedInUser)

    .get("/user-order-details", fetchUserOrder)
    .get("/sold-product-details", fetchSoldProducts)
// .get("/getProduct-details/:productId", getUserProductDetails)


module.exports = router