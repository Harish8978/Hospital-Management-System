import jwt from "jsonwebtoken"

import Doctor from "../models/Doctor.js"

const JWT_SECRET = process.env.JWT_SECRET

export default async function doctorAuth(req,res,next){
    const authHeader = req.header.authorization
    // Check token
    if(!authHeader || authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success:false,
              message:"That is Doctor not authorized or token not available"
        })
    }
    const token = authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token,JWT_SECRET)
        if(payload.role && payload.role !== 'doctor'){
            return res.status(403).json({
                success: false,
                message:"Access Denied(not a Doctor)"
            })
        }
        // Fetch Doctor
        const doctor = await Doctor.findById(payload.id).select("-password");
        if(!doctor) return res.status(401).json({
            success:false,
            message:"Doctor not found"
        })
        // Attaching doctor to the request
        req.doctor = doctor
        next();

        
    } catch (error) {
        console.error("Doctor JWT Verification Failed:",error.message || error);
        return res.status(401).json({
            success:false,
            message:"Token invalid or missing or expired" 
        })
    }
}

