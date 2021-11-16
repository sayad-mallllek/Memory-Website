var multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../memory/public/Images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  var multer = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        console.log("Success!");
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });
  
  var upload = multer.single("img");

module.exports.uploadImage = upload;