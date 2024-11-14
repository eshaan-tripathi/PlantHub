const userModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        if (!name) {
            return res.send('Name is required');
        }
        if (!email) {
            return res.send('Email is required');
        }
        if (!password) {
            return res.send('Password is required');
        }
        if (!phone) {
            return res.send('Phone is required');
        }
        if (!address) {
            return res.send('Address is required');
        }

        // Await the result of the findOne query
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Registered, please login"
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();

        res.status(200).send({
            success: true,
            message: 'User registered successfully',
            user
        });
    } catch (error) { // Changed 'err' to 'error' for consistency
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email not registered'
            });
        }

        const match = await comparePassword(password, user.password); // Fixed typo here

        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: 'Login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        });
    }
};

const testController = () => {};

module.exports = { registerController, loginController, testController };
