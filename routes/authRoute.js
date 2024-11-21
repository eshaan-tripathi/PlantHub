const express = require('express');
const route = express.Router();
const app = express();
const {registerController} = require('../controllers/authController');
const {loginController} = require('../controllers/authController');
const {testController} = require('../controllers/authController');
const {requireSignIn} = require('../middlewares/authMiddleware');
const {isAdmin} = require('../middlewares/authMiddleware');
const {forgotPassController} = require('../controllers/authController');
route.post('/register',registerController);

route.post('/login',loginController);

route.get('/test',requireSignIn,isAdmin, testController);

//forgot pass

route.post('/forgot-password',forgotPassController);

//protected route

route.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

module.exports = route;