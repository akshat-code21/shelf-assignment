import Router from "express";
import { authMiddleware } from "../middleware";
import { isAdmin } from "../middleware";
import { getBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/book.controller";
const bookRouter = Router();
bookRouter.use(authMiddleware);
bookRouter.use(isAdmin);
bookRouter.get('/', getBooks);
bookRouter.get('/:id', getBookById);
bookRouter.post('/', createBook);
bookRouter.put('/:id', updateBook);
bookRouter.delete('/:id', deleteBook);
export default bookRouter;