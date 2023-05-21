const express = require("express")
const {userController} = require("../controller");
const bcrypt = require("bcrypt");
const {generateToken,ErrorHandler} = require("../utils");
const router = express.Router();

router.post("/signup" , async(req,res,next)=>{

    try {

        const result = await userController.createUser(req.body);
        res.json(result);

    } catch (error) {
        next(new ErrorHandler(error))
    }
})

router.post("/login",async(req,res,next)=>{
    try{
        
        const result = await userController.loginUser(req.body);
        res.json(result);

    }catch(error){
        next(new ErrorHandler(error));
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
        const result = await userController.getAllUserData();
        res.json(result);

    } catch (error) {
        next(new ErrorHandler(error))
    }
})

module.exports = router; 
