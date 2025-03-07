const Admin = require("../models/Admin")
const asyncHandler = require("express-async-handler")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const { sendEmail } = require("../utils/email")
const { generateOTP } = require("../utils/otp")
const { differenceInSeconds } = require('date-fns')
const User = require("../models/User")


// admin registration
exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, mobile } = req.body
    if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(mobile)) {
        return res.status(400).json({ message: "all fields required" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "invalid email" })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ message: "invalid mobile" })
    }
    await Admin.create({ name, email, mobile })
    res.json({ message: "Admin register success" })
}
)


// admin login
exports.loginAdmin = asyncHandler(async (req, res) => {
    const { userName } = req.body

    const result = await Admin.findOne({ $or: [{ email: userName }, { mobile: userName }] })
    if (!result) {
        return res.status(400).json({ message: "invalid credentials" })
    }
    // send OTP
    const otp = generateOTP()
    await Admin.findByIdAndUpdate(result._id, { otp, otpSendOn: Date.now() })
    // await sendSMS({ number: result.mobile, message: `your otp is ${otp}` })
    await sendEmail({
        message: `<h1>Your OTP is ${otp}</h1>`,
        subject: "verify otp to login",
        to: result.email
    })
    res.json({ message: "otp send" })
})

// admin verification
exports.verifyAdminOTP = asyncHandler(async (req, res) => {
    const { otp, userName } = req.body  // 1234

    const result = await Admin.findOne({ $or: [{ email: userName }, { mobile: userName }] })
    if (!result) {
        return res.status(401).json({ message: "invalid credentials" })
    }
    if (result.otp !== otp) {
        return res.status(401).json({ message: "invalid otp" })
    }
    if (differenceInSeconds(Date.now(), result.otpSendOn) > process.env.OTP_EXPIRE) {
        await Admin.findByIdAndUpdate(result._id, { otp: null })
        return res.status(401).json({ message: "otp expire" })
    }

    await Admin.findByIdAndUpdate(result._id, { otp: null })
    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("olx-admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })

    res.json({
        message: "login success",
        result: {
            name: result.name,
            email: result.email
        }
    })
})


// admin logout
exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("olx-admin")
    res.json({ message: "logout success" })
})


// user registration

exports.registerUser = asyncHandler(async (req, res) => {
    const { email, name, mobile } = req.body
    const result = await User.findOne({
        $or: [
            { mobile },
            { email }
        ]
    })
    if (result) {
        return res.status(409).json({ message: "email or mobile already registered" })
    }
    await User.create(req.body)
    res.json({ message: "User register success" })

})

// User login

exports.loginUser = asyncHandler(async (req, res) => {
    const { userName } = req.body

    const result = await User.findOne({ $or: [{ email: userName }, { mobile: userName }] })
    if (!result) {
        return res.status(400).json({ message: "invalid credentials" })
    }
    // send OTP
    const otp = generateOTP()
    await User.findByIdAndUpdate(result._id, { otp, otpSendOn: Date.now() })
    res.json({ message: "otp send" })
})

// user verification

exports.verifyUserOTP = asyncHandler(async (req, res) => {
    const { otp, userName } = req.body  // 1234

    const result = await User.findOne({ $or: [{ email: userName }, { mobile: userName }] })
    if (!result) {
        return res.status(401).json({ message: "invalid credentials" })
    }
    if (result.otp !== otp) {
        return res.status(401).json({ message: "invalid otp" })
    }
    if (differenceInSeconds(Date.now(), result.otpSendOn) > process.env.OTP_EXPIRE) {
        await User.findByIdAndUpdate(result._id, { otp: null })
        return res.status(401).json({ message: "otp expire" })
    }

    await User.findByIdAndUpdate(result._id, { otp: null })
    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: "365d" })

    res.cookie("olx-user", token, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })

    res.json({
        message: "login success",
        result: {
            name: result.name,
            mobile: result.mobile,
            email: result.email,
            city: result.city,
            address: result.address,
            infoComplete: result.infoComplete
        }
    })
})

// user logout
exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("olx-user")
    res.json({ message: "logout user success" })
})

// // user registration mobile

// exports.registerUser_Mobile = asyncHandler(async (req, res) => {
//     const { email, name, mobile } = req.body
//     const result = await User.findOne({
//         $or: [
//             { mobile },
//             { email }
//         ]
//     })
//     if (result) {
//         return res.status(409).json({ message: "email or mobile already registered" })
//     }
//     await User.create(req.body)
//     res.json({ message: "User register success" })

// })

// // User login mobile

// exports.loginUser_Mobile = asyncHandler(async (req, res) => {
//     const { userName } = req.body

//     const result = await User.findOne({ $or: [{ email: userName }, { mobile: userName }] })
//     if (!result) {
//         return res.status(400).json({ message: "invalid credentials" })
//     }
//     // send OTP
//     const otp = generateOTP()
//     await User.findByIdAndUpdate(result._id, { otp, otpSendOn: Date.now() })
//     res.json({ message: "otp send" })
// })

// // user verification mobile

// exports.verifyUserOTP_Mobile = asyncHandler(async (req, res) => {
//     const { otp, userName } = req.body  // 1234

//     const result = await User.findOne({ $or: [{ email: userName }, { mobile: userName }] })
//     if (!result) {
//         return res.status(401).json({ message: "invalid credentials" })
//     }
//     if (result.otp !== otp) {
//         return res.status(401).json({ message: "invalid otp" })
//     }
//     if (differenceInSeconds(Date.now(), result.otpSendOn) > process.env.OTP_EXPIRE) {
//         await User.findByIdAndUpdate(result._id, { otp: null })
//         return res.status(401).json({ message: "otp expire" })
//     }

//     await User.findByIdAndUpdate(result._id, { otp: null })
//     const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: "365d" })

//     res.cookie("olx-user-mobile", token, {
//         maxAge: 1000 * 60 * 60 * 24 * 365,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production"
//     })

//     res.json({
//         message: "login success",
//         result: {
//             name: result.name,
//             mobile: result.mobile,
//             email: result.email,
//             city: result.city,
//             address: result.address,
//             infoComplete: result.infoComplete
//         }
//     })
// })

// // user logout mobile
// exports.logoutUser_Mobile = asyncHandler(async (req, res) => {
//     res.clearCookie("olx-user-mobile")
//     res.json({ message: "logout user success" })
// })