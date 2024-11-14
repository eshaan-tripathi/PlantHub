const express = require('express');
const route = express.Router();
const app = express();
const {registerController} = require('../controllers/authController');
const {loginController} = require('../controllers/authController');
const {testController} = require('../controllers/authController');
const {requireSignIn} = require('../middlewares/authMiddleware');
const {isAdmin} = require('../middlewares/authMiddleware');

route.post('/register',registerController);

route.post('/login',loginController);

route.get('/test',requireSignIn,isAdmin, testController);

module.exports = route;