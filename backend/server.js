import express from "express";
import cors from "cors";
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from "./config/db.js";
import doctorRouter from "./routes/DoctorRoute.js";
import serviceRouter from "./routes/ServiceRoute.js";
import appointmentRouter from "./routes/AppointmentRoute.js";
import serviceAppointmentRouter from "./routes/ServiceAppointmentRoute.js";

const app = express();
const PORT = 4000;

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174'
]
// Middlewares
app.use(cors({
    origin:function(origin,callBack){
        if(!origin) return callBack(null,true)
        if(allowedOrigins.includes(origin)){
            return callBack(null,true);
        }
        return callBack(new Error("Not allowed by CORS"));
    },
    credentials:true,
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
}));
app.use(clerkMiddleware());
app.use(express.json({limit:"20mb"}));
app.use(express.urlencoded({limit:"20mb",extended:true}));




// DB
connectDB();

// Routes
app.use("/api/doctors",doctorRouter)
app.use("/api/services",serviceRouter)
app.use("/api/appointments",appointmentRouter);
app.use("/api/service-appointments",serviceAppointmentRouter);
app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
})