import Book from "./book.model.js";
import Author from "./author.model.js";
import Publisher from "./publisher.model.js";
import {sequelize} from "../configuration/database.js";
import {DataTypes} from "sequelize";

// Book and Publisher. One-to-Many relationship
Book.belongsTo(Publisher, {
    foreignKey: "publisher",
    targetKey: "publisher_name",
    as: "publisherDetails"
});
Publisher.hasMany(Book, {
    foreignKey: "publisher",
    targetKey: "publisher_name",
    as: "books"
});

// Book and Author. Many-to-Many relationship
const BooksAuthors = sequelize.define("BookAuthor", {
    isbn: {
        type: DataTypes.STRING,
        references: {
            model: Book,
            key: "isbn"
        }
    },
    author_name: {
        type: DataTypes.STRING,
        references: {
            model: Author,
            key: "name"
        }
    }
}, {
    tableName: "books_authors"
});

Book.belongsToMany(Author, {
    through: "BooksAuthors",
    foreignKey: "isbn",
    otherKey: "author_name",
    as: "authors"
});
Author.belongsToMany(Book, {
    through: "BooksAuthors",
    foreignKey: "author_name",
    otherKey: "isbn",
    as: "books"
});

const syncModels = async () => {
    try {
        await sequelize.sync();
        console.log("Models synced successfully.");
    }
    catch (error) {
        console.error("Error syncing models:", error);
    }
};

export {syncModels, Book, Author, Publisher};