import {sequelize} from "../configuration/database.js";
import {DataTypes} from "sequelize";

const Publisher = sequelize.define('Publisher', {
    publisher_name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    tableName: 'publishers'
})

export default Publisher;