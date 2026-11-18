import * as authorService from '../services/author.service.js';

export const getAuthorsByBook = async (req, res, next) => {
    try {
        const authors = await authorService.getAuthorsByBook(req.params.isbn);
        return res.status(200).json(authors);
    } catch (e) {
        return next(e);
    }
}

export const removeAuthor = async (req, res, next) => {
    try {
        const author = await authorService.removeAuthor(req.params.author);
        return res.status(200).json(author);
    } catch (e) {
        return next(e);
    }
}
