import * as bookService from '../services/book.service';

export const addBook = async (req, res, next) => {
    try {
        const result = await bookService.addBook(req.body);
        return  res.sendStatus(200)
    } catch (e) {
        return next(e);
    }
}

export const getBookByIsbn = async (req, res, next) => {
    try {
        const book = await bookService.getBookByIsbn(req.params.isbn);
        return res.status(200).json(book);
    } catch (e) {
        return next(e);
    }
}

export const removeBook = async (req, res, next) => {
    try {
        const book = await bookService.removeBook(req.params.isbn);
        return res.status(200).json(book);
    } catch (e) {
        return next(e);
    }
}

export const updateBookTitle = async (req, res, next) => {
    try {
        const book = await bookService.updateBookTitle(req.params.isbn, req.params.title);
        return res.sendStatus(200).json(book);
    } catch (e) {
        return next(e);
    }
}

export const getBooksByAuthor = async (req, res, next) => {
    try {
        const books = await bookService.getBooksByAuthor(req.params.author);
        return res.status(200).json(books);
    } catch (e) {
        return next(e);
    }
}

export const getBooksByPublisher = async (req, res, next) => {
    try {
        const books = await bookService.getBooksByPublisher(req.params.publisher);
        return res.status(200).json(books);
    } catch (e) {
        return next(e);
    }
}

export const getAuthors = async (req, res, next) => {
    try {
        const authors = await bookService.getAuthors(req.params.isbn);
        return res.status(200).json(authors);
    } catch (e) {
        return next(e);
    }
}

export const getPublishersByAuthor = async (req, res, next) => {
    try {
        const publishers = await bookService.getPublishersByAuthor(req.params.author);
        return res.status(200).json(publishers);
    } catch (e) {
        return next(e);
    }
}

export const removeAuthor = async (req, res, next) => {
    try {
        const author = await bookService.removeAuthor(req.params.author);
        return res.status(200).json(author);
    } catch (e) {
        return next(e);
    }
}

