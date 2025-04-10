import Router from "express";
import { authMiddleware } from "../middleware";
import { prisma } from "../db";
const userRouter = Router();
userRouter.use(authMiddleware);
userRouter.get('/', async (req, res) => {
    const users = await prisma.users.findMany();
    res.json(users);
})
userRouter.get('/:id', async (req, res) => {
    const user = await prisma.users.findUnique({
        where: {
            id: req.params.id
        }
    })
    res.json(user);
})
export default userRouter;