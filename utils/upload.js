const multer = require("multer")
const productStorage = multer.diskStorage({
    filename: (req, file, cb) => { cb(null, file.originalname) }  //file k ander object aata. file frontend se ara h
})

exports.upload = multer({ storage: productStorage }).array("productImg", 5)