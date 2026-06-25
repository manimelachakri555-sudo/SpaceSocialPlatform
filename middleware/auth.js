import jwt from "jsonwebtoken";

const JWT_SECRET=process.env.JWT_SECRET || "space_secret";

export default function(req,res,next){

const header=req.headers.authorization;

if(!header){

return res.status(401).json({
message:"Unauthorized"
});

}

const token=header.split(" ")[1];

try{

const decoded=jwt.verify(token,JWT_SECRET);

req.user=decoded;

next();

}

catch{

return res.status(401).json({
message:"Invalid Token"
});

}

}