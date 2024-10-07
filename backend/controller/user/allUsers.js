const userModel = require("../../models/userModel")

async function allUsers(req,res) {
    try{
        console.log("userid all Users",req.userId)
        const allUser=await userModel.find()
        res.json({
            message:"All User",
            data:allUser,
            success:true,
            error:false
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            succus:false
        })
    }
}

module.exports=allUsers