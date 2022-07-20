const { conn } = require('./conn');
const { STRING } = conn.Sequelize;

const Singer = conn.define('singer', {
    name:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nationality: {
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})

module.exports = { Singer };