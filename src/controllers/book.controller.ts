import { prisma } from "../db";
import type { Request, Response } from "express";

export const getBooks = async (req: Request, res: Response) => {
    const books = await prisma.book.findMany();
    res.json(books);
}
export const getBookById = async (req: Request, res: Response) => {
    const book = await prisma.book.findUnique({
        where: { id: req.params.id }
    })
    if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
    }
    res.json(book);
}
export const createBook = async (req: Request, res: Response) => {
    const { title, author, genre, location, contact, status } = req.body;
    const book = await prisma.book.create({
        data: { title, author, genre, location, contact, status, ownerId: req.userId as string }
    })
    res.json({book});
}
export const updateBook = async (req: Request, res: Response) => {
    const { title, author, genre, location, contact, status } = req.body;
    const book = await prisma.book.update({
        where: { id: req.params.id },
        data: { title, author, genre, location, contact, status }
    })
    res.json(book);
}
export const deleteBook = async (req: Request, res: Response) => {
    const book = await prisma.book.delete({
        where: { id: req.params.id }
    })
    res.json(book);
}