import * as authorRepository from "../repositories/author.repository.js";

export const getPublishersByAuthor = async (authorName) => {
    const author = await authorRepository.findAuthorById(authorName);
    if (!author) {
        throw new Error('Author not found');
    }
    const books = await author.getBooks({attributes: ['publisher'], joinTableAttributes: []});
    return [...new Set(books.map(book => book.publisher))];
}
