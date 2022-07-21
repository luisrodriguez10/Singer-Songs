const { conn } = require('./conn');
const { STRING, INTEGER } = conn.Sequelize;
const { Genre } = require('./Genre');
const { Country } = require('./Country');

const Singer = conn.define('singer', {
    name:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        unique: true
    },
    genreId:{
        type: INTEGER,
        allowNull: false
    },
    countryId:{
        type: INTEGER,
        allowNull: false
    }
})

Singer.belongsTo(Genre);
Singer.belongsTo(Country);

module.exports = { Singer };