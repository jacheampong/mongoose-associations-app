const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  songTitle: String,
  duration: Number,
});

const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  releaseYear: String,

  // embed songs in album
  songs: [songSchema],
},
{ timestamps: true }
);

const Album = mongoose.model('Album', albumSchema);
const Song = mongoose.model('Song', songSchema);

module.exports = { Album, Song };