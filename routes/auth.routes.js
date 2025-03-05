const { loginAdmin, logoutAdmin, verifyAdminOTP, registerUser, loginUser, logoutUser, verifyUserOTP, registerAdmin, registerUser_Mobile, loginUser_Mobile, verifyUserOTP_Mobile, logoutUser_Mobile } = require("../controller/auth.controller")

const router = require("express").Router()
router
    // .post("/register-admin", registerAdmin)
    .post("/login-admin", loginAdmin)
    .post("/logout-admin", logoutAdmin)
    .post("/verify-admin", verifyAdminOTP)

    // desktop
    .post("/register-user", registerUser)
    .post("/login-user", loginUser)
    .post("/logout-user", logoutUser)
    .post("/verify-user", verifyUserOTP)

// mobile
// .post("/register-user-mobile", registerUser_Mobile)
// .post("/login-user-mobile", loginUser_Mobile)
// .post("/verify-user-mobile", verifyUserOTP_Mobile)
// .post("/logout-user-mobile", logoutUser_Mobile)

module.exports = router