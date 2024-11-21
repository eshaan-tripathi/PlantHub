const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireSignIn = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
  

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