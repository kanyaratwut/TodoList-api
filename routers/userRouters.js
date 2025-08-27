const express = require("express");
const router = express.Router();

const { userInfo, editUserInfo } = require("../controllers/userControllers");
const { authUser } = require("../middlewares/authUser");

router.get("/userInfo/:id", authUser, userInfo);
router.post("/userInfo/:id", authUser, editUserInfo);

module.exports = router;
