import express from "express"
import authRouter from "./routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import bookRouter from "./routes/book";
import userRouter from "./routes/user";
import logger from "morgan";
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));

app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);

app.listen(3001, () => {
}).on('error', (err) => {
    console.error('Server error:', err);
});