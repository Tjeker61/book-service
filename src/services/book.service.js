import * as bookRepository from '../repositories/book.repository.js'
import * as publisherRepository from "../repositories/publisher.repository.js";
import * as authorRepository from "../repositories/author.repository.js";
import {sequelize} from "../configuration/database.js";
import {bookAttributes, includeAuthors} from "./query.options.js";

const bookWithAuthors = {
    attributes: bookAttributes,
    include: [includeAuthors]
};

export const addBook = async (book) => {
    const t = await sequelize.transaction();
    try {
        const {isbn, title} = book;
        if (await bookRepository.findBookById(isbn, {transaction: t})) {
            throw new Error('Book with the same isbn already exists');
        }
        // Create or find the publisher
        const publisher = await publisherRepository.findPublisherById(book.publisher, {transaction: t});
        if (!publisher) {
            await publisherRepository.addPublisher(book.publisher, {transaction: t});
        }
        // Process the authors
        const authors = [];
        for (const a of book.authors) {
            let author = await authorRepository.findAuthorById(a.name, {transaction: t});
            if (!author) {
                author = await authorRepository.addAuthor(a, {transaction: t});
            }
            authors.push(author);
        }
        // Create a new Book
        const newBook = await bookRepository.addBook({isbn, title, publisher: book.publisher}, {transaction: t});
        await newBook.setAuthors(authors, {transaction: t});
        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log('Error adding book:', e);
        throw e;
    }
}

export const getBookByIsbn = async (isbn) => {
    const book = await bookRepository.findBookById(isbn, bookWithAuthors);
    if (!book) {
        throw new Error('Book not found');
    }
    return book;
}

export const removeBook = async (isbn) => {
    const t = await sequelize.transaction();
    try {
        const book = await bookRepository.findBookById(isbn, {...bookWithAuthors, transaction: t});
        if (!book) {
            throw new Error('Book not found');
        }
        await bookRepository.removeBook(isbn, {transaction: t});
        await t.commit();
        return book;
    } catch (e) {
        await t.rollback();
        console.log('Error removing book:', e);
        throw e;
    }
}

export const updateBookTitle = async (isbn, newTitle) => {
    const book = await bookRepository.findBookById(isbn);
    if (!book) {
        throw new Error('Book not found');
    }
    await bookRepository.updateBookTitle(book, newTitle);
    return getBookByIsbn(isbn);
}

export const getBooksByAuthor = async (authorName) => {
    const author = await authorRepository.findAuthorById(authorName);
    if (!author) {
        throw new Error('Author not found');
    }
    return await author.getBooks({...bookWithAuthors, joinTableAttributes: []});
}

export const getBooksByPublisher = async (publisherName) => {
    const publisher = await publisherRepository.findPublisherById(publisherName);
    if (!publisher) {
        throw new Error('Publisher not found');
    }
    return await publisher.getBooks(bookWithAuthors);
}
