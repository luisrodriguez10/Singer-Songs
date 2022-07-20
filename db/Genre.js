const { conn } = require('./conn');
const { STRING } = conn.Sequelize;

const Genre = conn.define('genre', {
    name:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})

module.exports = { Genre };