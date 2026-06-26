import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Auth from "../models/Auth.js";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "space_secret";

export const signup = async(req,res)=>{

try{

const {email,password}=req.body;

const exists=await Auth.findOne({email});

if(exists){
return res.status(400).json({
message:"Email already exists"
});
}

const hashedPassword=await bcrypt.hash(password,10);

const auth=await Auth.create({
email,
password:hashedPassword
});

const token=jwt.sign(
{id:auth._id},
JWT_SECRET,
{expiresIn:"7d"}
);

res.status(201).json({
    token,
    userId: auth._id
});
}

catch(err){

res.status(500).json({
message:err.message
});

}

};

export const login=async(req,res)=>{

try{

const {email,password}=req.body;

const auth=await Auth.findOne({email});

if(!auth){

return res.status(404).json({
message:"Invalid Email"
});

}

const match=await bcrypt.compare(password,auth.password);

if(!match){

return res.status(401).json({
message:"Wrong Password"
});

}

const token=jwt.sign(
{id:auth._id},
JWT_SECRET,
{expiresIn:"7d"}
);

const profile=await User.findOne({
authUserId:auth._id
});

res.json({
    token,
    userId: auth._id,
    profileExists: !!profile,
    profile
});

}

catch(err){

res.status(500).json({
message:err.message
});

}

};