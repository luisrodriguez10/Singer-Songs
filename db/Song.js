const { conn } = require('./conn');
const { STRING, INTEGER } = conn.Sequelize;
const { Singer } = require('./Singer');
const { Genre } = require('./Genre');

const Song = conn.define('song', {
    name:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    singerId: {
        type: INTEGER,
        allowNull: false
    },
    genreId: {
        type: INTEGER,
        allowNull: false
    }
})

Song.belongsTo(Singer);
Song.belongsTo(Genre);


module.exports = { Song };