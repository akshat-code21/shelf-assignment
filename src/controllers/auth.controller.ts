import type { Request, Response } from "express"
import { prisma } from "../db/index"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, mobile, role } = req.body;
        await prisma.users.create({
            data: {
                name, email, password, mobile, role
            }
        })
        res.json({
            message: "User successfully signed up."
        })
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.users.findFirst({
            where: {
                email
            }
        })
        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
            return;
        }
        const token = jwt.sign({
            id: user.id
        }, JWT_SECRET as string)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({
            message: "User successfully signed in.",
            token
        })
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Error signing in' });
    }
}
export const logout = async (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    });
    res.json({ message: 'User successfully logged out.' });
}