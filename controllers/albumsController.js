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


// EDIT SONG 
router.get('/:albumId/songs/:songId/edit', (req, res) => {
    // set the value of the album and song ids
    const { albumId, songId } = req.params

    // find album in db by id
    Album.findById(albumId, (err, album) => {
        // find song embedded in album
        const song = album.songs.id(songId);
        // update song and completed with data from request body
        res.render('songs/edit.ejs', { album, song });
    });
});


// UPDATE SONG EMBEDDED IN A ALBUM DOCUMENT
router.put('/:albumId/songs/:songId', (req, res) => {
console.log('PUT ROUTE');
// set the value of the ablum and song ids
const { albumId, songId } = req.params

    // find user in db by id
    Album.findById(albumId, (err, foundAlbum) => {
        // find song embedded in album
        const foundSong = foundAlbum.songs.id(songId);
        // update song and completed with data from request body
        foundSong.songTitle = req.body.songTitle
        foundSong.duration = req.body.duration
        foundAlbum.save((err, savedAlbum) => {
            res.redirect(`/albums/${foundAlbum.id}`);
        });
    });
});

module.exports = router;
