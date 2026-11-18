import * as bookRepository from '../repositories/book.repository.js'
import * as authorRepository from "../repositories/author.repository.js";
import {sequelize} from "../configuration/database.js";
import {authorAttributes} from "./query.options.js";

export const getAuthorsByBook = async (isbn) => {
    const book = await bookRepository.findBookById(isbn);
    if (!book) {
        throw new Error('Book not found');
    }
    return await book.getAuthors({
        attributes: authorAttributes,
        joinTableAttributes: []
    });
}

export const removeAuthor = async (authorName) => {
    const t = await sequelize.transaction();
    try {
        const author = await authorRepository.findAuthorById(authorName, {
            attributes: authorAttributes,
            transaction: t
        });
        if (!author) {
            throw new Error('Author not found');
        }
        // Remove all books
        const books = await author.getBooks({attributes: ['isbn'], joinTableAttributes: [], transaction: t});
        await bookRepository.removeBooks(books.map(book => book.isbn), {transaction: t});
        await authorRepository.removeAuthor(authorName, {transaction: t});
        await t.commit();
        return author;
    } catch (e) {
        await t.rollback();
        console.log('Error removing author:', e);
        throw e;
    }
}
