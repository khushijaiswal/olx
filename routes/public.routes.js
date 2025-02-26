const { getPublicProductDetails, getPublicProduct } = require("../controller/public.contoller")

const router = require("express").Router()
router
    .get("/getProduct-public", getPublicProduct)
    .get("/getProduct-details-public/:productId", getPublicProductDetails)

module.exports = router