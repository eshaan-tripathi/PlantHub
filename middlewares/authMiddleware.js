const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireSignIn = async(req,res,next)=>{
    try{
   const decode = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
   req.user = decode;
   next();
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Error in registeration',
            err
        })
    }
}

const isAdmin = async (req,res,next)=>{
    try{
       const user = userModel.findById(req.user._id);
       if(!user.role){
        return res.status(401).send({
            success:false,
            message:'Not Authorized'
        });
       }
       else{
        next();
       }

    }
    catch(err){
        console.log(err);
    }
}
module.exports = {requireSignIn,isAdmin}