// Contains actual logic for user registration
// Separated from routes for better organization
// Handles:
// Validation
// Hashing password
// DB interaction
// Response
const User = require("../models/User.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


// Controller function for user registration
const registerUser = async(req,res)=>{//use of async-await for handling asynchronous operations
    try{
        const{name,email,password}= req.body;
        // Basic validation
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }// --- NEW: Password Length Validation ---
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({email});//await used to wait for the database query to complete
        if(existingUser){
            return res.status(409).json({message:"User already exists"});
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password,10);
        // Create new user
        const newUser =await User.create({
            name,email,password:hashedPassword
        });
        // Respond with success (excluding password)
        res.status(201).json({message:"User registered successfully",user:newUser});
    }catch(error){
        console.error("Error registering user:",error);
        res.status(500).json({message:"Internal server error"});
    }
};

//login logic would go here
const loginUser = async(req,res)=>{
    try{
        const{email,password}= req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields required"});
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid credentials"});
        }
        // Generate JWT token
        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        res.status(200).json({message:"Login successful",token});
    }catch(error){
        console.error("Error logging in user:",error);
        res.status(500).json({message:"Internal server error"});
    }
};
// Controller function to get current user details

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // DEBUG: Look at your terminal! Does 'email' appear here?
    console.log("Full User Data from DB:", user);

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email // If this is undefined, it won't show up in Postman
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={registerUser,loginUser,getMe};