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


// CREATE SONG EMBEDDED IN ALBUM
router.post('/:albumId/songs', (req, res) => {
    console.log(req.body);
    // store new song in memory with data from request body
    const newSong = new Song({ 
        songTitle: req.body.songTitle,
        duration: req.body.duration
    });
    // find album in db by id and add new song
    Album.findById(req.params.albumId, (error, album) => {
        album.songs.push(newSong)
        album.save((err, album) => {
            res.redirect(`/albums/${album.id}`);
        });
    });
});

module.exports = router;
