const userModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        if (!phone) {
            return res.status(400).json({ message: 'Phone is required' });
        }
        if (!address) {
            return res.status(400).json({ message: 'Address is required' });
        }
        if (!answer) {
            return res.status(400).json({ message: 'Answer is required' });
        }

        // Convert the answer to lowercase before saving it
        const normalizedAnswer = answer.toLowerCase();

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Already Registered, please login" });
        }

        // Hash the password before saving it
        const hashedPassword = await hashPassword(password);

        // Create a new user and save to the database
        const user = new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer: normalizedAnswer, // Store the normalized answer
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in registration',
            error: process.env.NODE_ENV === 'development' ? error : null,
        });
    }
};


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email not registered",
            });
        }

        // Check password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        // Generate JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Respond with token and user details
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

const forgotPassController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        if (!email || !answer || !newPassword) {
            return res.status(400).json({ success: false, message: 'Email, Answer, and New Password are required' });
        }

        // Normalize the answer to lowercase before checking in the database
        const normalizedAnswer = answer.toLowerCase();

        // Check if the user exists and the answer matches
        const user = await userModel.findOne({ email, answer: normalizedAnswer });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Wrong Email or Answer' });
        }

        // Hash the new password and update it
        const hashedPassword = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

        return res.status(200).json({ success: true, message: 'Password Reset Successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: process.env.NODE_ENV === 'development' ? error : null,
        });
    }
};


const testController = () => {};

module.exports = { registerController, loginController, testController,forgotPassController };
