import {Book} from '../models/index.js'

export const addBook = async (book, options = {}) => Book.create(book, options)

export const findBookById = async (id, options = {}) => Book.findByPk(id, options)

export const removeBook = async (isbn) => Book.destroy({where: {isbn}})

export const updateBookTitle = async (isbn, title) => {
    const book = await Book.findByPk(isbn);
    book.title = title;
    await book.save();
    return book;
}

