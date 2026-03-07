const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');  
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    await user.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.login=async(req,res)=>{
  try{
    const {email,password}=req.body;
    if(!email || !password){
      return res.status(400).json({message:'All fields are required'})
    }
    const existingUser=await User.findOne({email});
    if(!existingUser){
      return res.status(400).json({message:'Invalid Credentials'})
    }
    const isMatch=await bcrypt.compare(password,existingUser.password);
    if(!isMatch){
      return res.status(400).json({message:'Invalid Credentials'})
    }
    const token=jwt.sign({id:existingUser._id,email:existingUser.email,name:existingUser.name},process.env.JWT_SECRET,{expiresIn:'1h'});
    console.log("LOGIN SECRET:", process.env.JWT_SECRET);
    return res.status(200).json({message:'Login successful',token,user:{id:existingUser._id,email:existingUser.email,name:existingUser.name}})
  }
  catch(error){
    res.status(500).json({ message: "Server Error" });
  }
}