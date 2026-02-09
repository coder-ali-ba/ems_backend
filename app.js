import express from "express";
import mongoose from "mongoose";
import  dotenv  from "dotenv";
import cors from 'cors'
import AuthRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import employeeRouter from "./routes/employeeRoutes.js";


dotenv.config()
const app = express()

const PORT =process.env.PORT

mongoose.connect(process.env.mongoURI)
.then(()=>console.log("connected"))
.catch((error)=>console.log(error.message)
)

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}))
app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(cookieParser())


app.use("/api/auth" , AuthRouter)
app.use("/api/admin" , adminRouter);
app.use("/api/employee" , employeeRouter);


app.listen(PORT , ()=>{
    console.log(`Server is listening http://localhost:${PORT}`);   
})