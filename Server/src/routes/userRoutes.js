const express = require("express")
const {userController} = require("../controller");
const bcrypt = require("bcrypt");
const {generateTokens,ErrorHandler} = require("../utils");
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
        
        const currentUser = await userController.getUserByEmail(req.body);
        
        if(!currentUser)
            return res.status(401).json({error:true, message:"Email Incorrect"});
        const verifyPassword =  await bcrypt.compare(req.body.userPassword , currentUser.userPassword );
        if(!verifyPassword)
            return res.status(401).json({error:true, message:"Password Incorrect"});
        
        const {accessToken , refreshToken} = await generateTokens(currentUser);
        res.status(200).json({
            error:false,
            accessToken,
            refreshToken,
            message:"Logged In"
        })

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
