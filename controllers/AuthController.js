const User = require('../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const TOKEN_KEY = process.env.TOKEN_KEY || "abcdefghijklmnop"

async function register(req){
    const { email, password, username } = req;
    const first_name = req.first_name ?? null
    const last_name = req.last_name ?? null

    // Validate user input
    if (!(email && password && username)) {
        return {
            status: 400,
            message: "All input is required",
            data: null
        }
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
        return {
            status: 409,
            message: "User Already Exist. Please Login",
            data: null
        }
    }

    //Encrypt user password
    let encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email.toLowerCase(), // sanitize
        password: encryptedUserPassword,
    });

    // Create token
    // save user token
    user.token = jwt.sign(
        {user_id: user._id, email},
        TOKEN_KEY,
        {
            expiresIn: "5h",
        }
    );

    return {
        status: 200,
        message: "Registration successful",
        data: user
    }
}

async function login(req){

    const { email, password } = req;

    // Validate user input
    if (!(email && password)) {
        return {
            status: 400,
            message: "All input is required",
            data: null
        }
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        // save user token
        user.token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        );

        // user
        return {
            status: 200,
            message: "Registration successful",
            data: user
        }
    }
    return {
        status: 400,
        message: "Invalid Credentials",
        data: null
    }
}

module.exports = {
    login,
    register
}