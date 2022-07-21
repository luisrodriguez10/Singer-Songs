const { conn } = require('./conn');
const { Singer } = require('./Singer');
const { Genre } = require('./Genre');
const { Song } = require('./Song');
const seedDataGenres = require('./seed-genres.json');
const seedDataSingers = require('./seed-singers.json');
const seedDataSongs = require('./seed-songs.json');

const seeder = async() =>{
    await conn.sync({force: true});
    await Promise.all(seedDataGenres.map((genre) => Genre.create(genre)));
    await Promise.all(seedDataSingers.map(singer => Singer.create(singer)));
    await Promise.all(seedDataSongs.map(song => Song.create(song)));
}

module.exports = { seeder };