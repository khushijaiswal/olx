const { loginAdmin, logoutAdmin, verifyAdminOTP, registerUser, loginUser, logoutUser, verifyUserOTP, registerAdmin } = require("../controller/auth.controller")

const router = require("express").Router()
router
    // .post("/register-admin", registerAdmin)
    .post("/login-admin", loginAdmin)
    .post("/logout-admin", logoutAdmin)
    .post("/verify-admin", verifyAdminOTP)

    .post("/register-user", registerUser)
    .post("/login-user", loginUser)
    .post("/logout-user", logoutUser)
    .post("/verify-user", verifyUserOTP)

module.exports = router