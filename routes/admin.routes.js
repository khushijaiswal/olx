const { AdminAllUsers, getAdminProducts, adminBlockUnblockUser, getAdminOrders } = require("../controller/admin.controller")

const router = require("express").Router()
router
    .get("/allUsers-admin", AdminAllUsers)
    .get("/getProduct-admin", getAdminProducts)
    .get("/getOrders-admin", getAdminOrders)
    .put("/blockUnblock-admin/:uid", adminBlockUnblockUser)

module.exports = router