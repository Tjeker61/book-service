import {Router} from "express";
import * as bookController from "../controllers/book.controller.js";

const router = Router();

router.post('/book', bookController.addBook)
router.get('/book/:isbn', bookController.getBookByIsbn)
router.delete('/book/:isbn', bookController.removeBook)
router.patch('/book/:isbn/title/:title', bookController.updateBookTitle)
router.get('/books/author/:author', bookController.getBooksByAuthor)
router.get('/books/publisher/:publisher', bookController.getBooksByPublisher)

router.get('/author/book/:isbn', bookController.getAuthors)
router.delete('/author/:author', bookController.removeAuthor)

router.get('/publishers/author/:author', bookController.getPublishersByAuthor)

export default router;