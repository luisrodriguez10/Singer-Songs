const { conn } = require('./conn');
const { STRING, INTEGER } = conn.Sequelize;
const { Genre } = require('./Genre');

const Singer = conn.define('singer', {
    name:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        unique: true
    },
    nationality: {
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    genreId:{
        type: INTEGER,
        allowNull: false
    }
})

Singer.belongsTo(Genre);

module.exports = { Singer };