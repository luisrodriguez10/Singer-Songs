const { conn } = require('./conn');
const { STRING } = conn.Sequelize;

const Country = conn.define('country', {
    name:{
        type: STRING,
        allowNull: false,
        unique: true
    }
})


module.exports = { Country };