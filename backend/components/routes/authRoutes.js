const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");


router.post("/register", authController.register);
router.post("/login", authController.login);


module.exports = router;


// {
//     "message": "user register successfully",
//     "userId": "65fbb93cf04b7715c955cc0d"
// }
// {
//     "message": "login successfully",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmJiOTNjZjA0Yjc3MTVjOTU1Y2MwZCIsImlhdCI6MTcxMDk5NTgwOX0.I794F3FGu-DefAMeMczyT6VRM00VQeIdvjoqTGkOIFg"
// }