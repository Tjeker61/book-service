import {Book} from '../models/index.js'

export const addBook = async (book, options = {}) => Book.create(book, options)

export const findBookById = async (id, options = {}) => Book.findByPk(id, options)

export const removeBook = async (isbn, options = {}) => Book.destroy({where: {isbn}, ...options})

export const removeBooks = async (isbns, options = {}) => Book.destroy({where: {isbn: isbns}, ...options})

export const updateBookTitle = async (book, title, options = {}) => book.update({title}, options)
