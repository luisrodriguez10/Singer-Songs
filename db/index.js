const { conn } = require('./conn');
const { SINGERS, SONGS } = require('./seed-data');
const { Singer } = require('./Singer');
const { Genre } = require('./Genre');
const { Song } = require('./Song');

const seeder = async() =>{
    await conn.sync({force: true});
    await Promise.all(SINGERS.map(singer => Singer.create(singer)));
    await Promise.all([ 'Hip Hop', 'Latin', 'Classical', 'Funk', 'Pop'].map(name => Genre.create({name})))
    await Promise.all(SONGS.map(song => Song.create(song)));

}

module.exports = { seeder };