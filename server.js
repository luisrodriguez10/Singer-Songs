const express = require("express");
const app = express();
const path = require('path');
const { seeder } = require("./db/index");
const { Singer } = require('./db/Singer');
const { Genre } = require('./db/Genre');
const { Song } = require('./db/Song');
const { Country } = require('./db/Country');

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/singers', async(req, res, next) =>{
    try {
        res.send(await Singer.findAll());
    } catch (ex) {
        next(ex)
    }
})

app.post('/api/singers', async(req, res, next) =>{
    try {
        res.status(201).send( await Singer.create(req.body));
    } catch (ex) {
        next(ex)
    }
})

app.put('/api/singers/:id', async(req, res, next) =>{
    try {
        const singer = await Singer.findByPk(req.params.id);
        await singer.update(req.body);
        res.send(singer);
    } catch (ex) {
        next(ex)
    }
})

app.get('/api/genres', async(req, res, next) =>{
    try {
        res.send(await Genre.findAll({
            order: [
                ['name', 'ASC']
            ]
        }));
    } catch (ex) {
        next(ex)
    }
})
app.get('/api/songs', async(req, res, next) =>{
    try {
        res.send(await Song.findAll());
    } catch (ex) {
        next(ex)
    }
})

app.get('/api/countries', async(req, res, next) =>{
    try {
        res.send(await Country.findAll({
            order: [
                ['name', 'ASC']
            ]
        }));
    } catch (ex) {
        next(ex)
    }
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ err });
  });


const init = async () => {
  try {
    await seeder();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`app listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
