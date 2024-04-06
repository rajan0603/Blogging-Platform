const express = require("express");
const path = require("path"); // Import path module
const bloggingController = require("../controllers/bloggingController");
const authenticateToken = require("../middleware/authTokenJWT");
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
 
const upload = multer({ storage: storage });

// Define routes
router.post("/", authenticateToken, upload.single('file'), bloggingController.createBlogging);
router.get("/", bloggingController.getAllBlogging);
router.put("/:id", authenticateToken, bloggingController.updateBlogging);
router.delete("/:id", authenticateToken, bloggingController.deleteBlogging);
router.post("/likes/:id", bloggingController.updateLikes);
router.post("/comments/:id", bloggingController.updateComment);

module.exports = router;




// const express = require("express");
// const bloggingController = require("../controllers/bloggingController");
// const authenticateToken = require("../middleware/authTokenJWT");
// const multer = require('multer');

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
   
// const upload = multer({ storage: storage });

// router.post("/",authenticateToken, upload.single('file'), bloggingController.createBlogging);
// router.get("/", bloggingController.getAllBlogging);
// router.put("/:id", authenticateToken, bloggingController.updateBlogging);
// router.delete("/:id", authenticateToken,bloggingController.deleteBlogging);
// router.patch("/likes/:id", bloggingController.updateLikes);
// router.patch("/comments/:id", bloggingController.updateComment);



// module.exports = router;