const { faker } = require("@faker-js/faker");

const SINGERS = [];
const SONGS = [];
const GENRES = [];

function createRandomSinger() {
    return {
        name: faker.name.findName(),
        nationality: faker.address.country()
    }
}

function createRandomGenre(){
    return {
        name: faker.music.genre()
    }
}

function createRandomSong(){
    return{
        name: faker.music.songName(),
        singerId: Math.ceil(Math.random() * 5),
        genreId: Math.ceil(Math.random() * 5)
    }
}

Array.from({length: 5}).forEach(() => SINGERS.push(createRandomSinger()));
Array.from({length: 5}).forEach(() => GENRES.push(createRandomGenre()));
Array.from({length: 10}).forEach(() => SONGS.push(createRandomSong()));

module.exports = { SINGERS, GENRES, SONGS };