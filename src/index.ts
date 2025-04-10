import express from "express"
import authRouter from "./routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import bookRouter from "./routes/book";
import userRouter from "./routes/user";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/auth',authRouter);
app.use('/api/books',bookRouter);
app.use('/api/users',userRouter);
app.listen(3001,()=>{
    console.log("Server up on port 3001");
})