const express = require("express")

const {createUser, getUserData, updateUser} = require("../controller/user")

const router = express.Router();

router.route("/user").get(getUserData);
router.route("/user/new").post(createUser);
router.route("/user/:id").post(updateUser);




module.exports = router; 
