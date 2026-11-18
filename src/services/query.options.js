import {Author} from "../models/index.js";
import {sequelize} from "../configuration/database.js";

export const authorAttributes = ['name', [sequelize.col('birth_date'), 'birthDate']];

export const bookAttributes = {
    exclude: ['createdAt', 'updatedAt']
};

export const includeAuthors = {
    model: Author,
    as: 'authors',
    attributes: authorAttributes,
    through: {
        attributes: []
    }
};
