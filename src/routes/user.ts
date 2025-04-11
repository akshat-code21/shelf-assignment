import Router from "express";
import { authMiddleware } from "../middleware";
import { prisma } from "../db";
import type { Request, Response } from "express";
const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get('/me', async (req: Request, res: Response) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: req.userId
            }
        });        

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error finding user' });
    }
});

userRouter.get('/', async (req: Request, res: Response) => {
    const users = await prisma.users.findMany();
    res.json(users);
});

userRouter.get('/:id', async (req: Request, res: Response) => {
    const user = await prisma.users.findUnique({
        where: {
            id: req.params.id
        }
    });
    res.json(user);
});

export default userRouter;