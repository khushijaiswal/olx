const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.adminprotected = async (req, res, next) => {
    const admin = req.cookies["olx-admin"]
    if (!admin) {
        return res.status(401).json({ message: "no cookie found" })
    }

    jwt.verify(admin, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(401).json({ message: "invalid token" })
        }
        next()
    })

}

exports.userProtected = async (req, res, next) => {
    const user = req.cookies["olx-user"]
    // console.log(user)
    if (!user) {
        return res.status(401).json({ message: "no cookie found" })
    }

    jwt.verify(user, process.env.JWT_SECRET, async (err, decode) => {  //decode mein wahi data ata jo humne auth.controller se bheja
        if (err) {
            return res.status(401).json({ message: "invalid token" })
        }

        const result = await User.findById(decode._id)
        if (!result) {
            console.log(decode._id)

            return res.status(401).json({ message: "invalid user id" })


        }
        if (!result.isActive) {
            return res.status(401).json({ message: "account block by admin" })
        }
        req.loggedInUser = decode._id
        next()
    })

}