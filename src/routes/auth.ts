import Router from "express"
import { signin, signup, logout } from "../controllers/auth.controller";
const authRouter = Router();
authRouter.post('/signup',signup)
authRouter.post('/signin',signin)
authRouter.post('/logout',logout)
export default authRouter;