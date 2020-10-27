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
        // res.redirect(`/albums/${album.id}`)
        res.send(album)
    });
});

module.exports = router;
