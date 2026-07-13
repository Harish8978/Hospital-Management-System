import mongoose from "mongoose"

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://workwithharishp_db_user:Op6aJXmU1fxNlkhS@cluster0.uwuzqvp.mongodb.net/MediCare")
    .then(()=>{
        console.log("Mongo DB connected to your Server");
    })
}