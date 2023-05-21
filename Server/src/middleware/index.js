const authUser=require("./authUser");
const catchAsyncError=require("./catchAsyncErrors");
const errorMiddleware=require("./error");
const authAdmin=require("./authAdmin");

module.exports={
    authUser,
    catchAsyncError,
    errorMiddleware,
    authAdmin,
}