const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  cast: {
    type: [String],
    required: true
  },
  genres: {
    type: [String],
    required: true
  },
  href: {
    type: String,
    required: true
  },
  extract: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: false
  },
  thumbnail_width: {
    type: Number,
    required: false
  },
  thumbnail_height: {
    type: Number,
    required: false
  }
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
