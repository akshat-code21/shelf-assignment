import type { Request, Response } from "express"
import { prisma } from "../db/index"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"
export const signup = async (req: Request, res: Response) => {
    const { name, email, password, mobile } = req.body;
    await prisma.users.create({
        data: {
            name, email, password, mobile
        }
    })
    res.json({
        message : "User successfully signed up."
    })
}
export const signin = async(req:Request,res:Response) => {
    const {email,password} = req.body;
    const user = await prisma.users.findFirst({
        where:{
            email
        }
    })
    if(!user){
        res.json({
            message : "User not found"
        })
        return;
    }
    const token = jwt.sign({
        id: user.id
    }, JWT_SECRET as string)
    res.json({
        message : "User successfully signed in.",
        token
    })
}