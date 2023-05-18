const express = require("express")
const ErrorHandler = require("../utils/errorHandler");

const {userController} = require("../controller");
const { find } = require("../models/user");

const router = express.Router();


router.post("/newUser" , async(req,res,next)=>{

    try {
        const result = await userController.createUser(req.body);
        res.json(result);

    } catch (error) {
        next(new ErrorHandler(error))
    }
})

router.put("/updateUser/:id" , async(req,res,next)=>{

    try {
        const result = await userController.updateUser({id:req.params['id'], ...req.body});
        res.json(result);

    } catch (error) {
        next(new ErrorHandler(error))
    }
})

router.delete("/deleteUser/:id" , async(req,res,next)=>{

    try {
        const result = await userController.deleteUser({id:req.params['id']});
        res.json(result);

    } catch (error) {
        next(new ErrorHandler(error))
    }
})

router.get("/getUser" , async(req,res,next)=>{

    try {
        const result = await userController.getUserData();
        res.json(result);

    } catch (error) {
        next(new ErrorHandler(error))
    }
})

module.exports = router; 
