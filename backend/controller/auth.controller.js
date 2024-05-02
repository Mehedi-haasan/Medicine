const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../schema/user.schema");
const config = require('../config/auth.config')



exports.signUp = async (req, res) => {
    const { username, email, password, fullName, profile, createdAt } = req.body;
    console.log(username,email)

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        let roleId = 1;
        // if (rules) {
        //     roleId = await someAsyncOperation(rules);
        // }

        const hashedPassword = await bcrypt.hash(password, 8);

        // Create a new user
        await User.create({
            username:username,
            email:email,
            password: hashedPassword,
            fullName:fullName,
            profile:profile,
        });

        res.status(201).json({
            success: true,
            message: "Registration successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


exports.signIn = async (req, res) => {
    const { username, email, password} = req.body;
    try {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if the provided password is valid
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ success: false, message: "Invalid password." });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // 24 hours in seconds
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            id: user._id,
            accessToken: token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



async function someAsyncOperation(rules) {
    let roleId;

    if (rules) {
        if (rules[0] === "admin") {
            roleId = 2;
        } else if (rules[0] === "superadmin") {
            roleId = 3;
        } else if (rules[0] === "modarator") {
            roleId = 4;
        } else {
            roleId = 1;
        }
    }
    return roleId
}