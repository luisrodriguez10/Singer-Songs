const { conn } = require('./conn');
const { SINGERS, GENRES, SONGS } = require('./seed-data');
const { Singer } = require('./Singer');
const { Genre } = require('./Genre');
const { Song } = require('./Song');

const seeder = async() =>{
    await conn.sync({force: true});
    await Promise.all(SINGERS.map(singer => Singer.create(singer)));
    await Promise.all(GENRES.map(genre => Genre.create(genre)));
    await Promise.all(SONGS.map(song => Song.create(song)));

}

module.exports = { seeder };