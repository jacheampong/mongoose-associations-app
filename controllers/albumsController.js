const router = require('express').Router();

const { Album, Song} = require('../models/album')

// NEW ALBUM FORM
router.get('/new', (req, res) => {
res.render('albums/new.ejs');
});

// ALBUM INDEX PAGE
router.get('/', (req, res) => {
    // find all albums
    Album.find({}, (error, albums) => {
        console.log(`${albums}`)
        res.render('albums/index.ejs', { albums });
    });
});

// CREATE A NEW ALBUM
router.post('/', (req, res) => {
    Album.create(req.body, (error, album) => {
        res.redirect(`/albums/${album.id}`)
        // res.send(album)
    });
});

// ADD EMPTY FORM TO ALBUM SHOW PAGE TO ADD SONGS TO A ALBUM
router.get('/:albumId', (req, res) => {
    // find album in db by id and add new songs
    Album.findById(req.params.albumId, (error, album) => {
        res.render('albums/show.ejs', { album });
    });
});

module.exports = router;
