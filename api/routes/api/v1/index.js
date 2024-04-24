const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../../../models/Movie');

router.get('/', async (req, res) => {
  res.send('Welcome to the Movie App API');
})

router.get('/movies/random', async (req, res) => {
  try {
    // Query the database to find a random movie
    const movie = await Movie.findOne().skip(Math.floor(Math.random() * await Movie.countDocuments()));

    // Check if movie exists
    if (!movie) {
      return res.status(404).json({ error: 'No movies found in the collection' });
    }

    // Send the movie data back as a response
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/random-movies', async (req, res) => {
  try {
    // Execute the MongoDB aggregation query
    const movies = await Movie.aggregate([
      { $sample: { size: 25 } },
      { $sort: { "year": -1 } }
    ]);

    // Send the result back as a response
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/genres', async (req, res) => {
  try {
    // Execute the MongoDB aggregation query
    const genresCount = await Movie.aggregate([
      { $unwind: '$genres' },
      { $group: { _id: '$genres', count: { $sum: 1 } } },
      { $sort: { count: 1 } }
    ]);

    // Send the result back as a response
    res.json(genresCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all movies with search query
router.get('/movies', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    let movies;

    if (searchQuery) {
      // Filter movies by search query
      movies = await Movie.find({ $text: { $search: searchQuery } });
    } else {
      // Get all movies if no search query is provided
      movies = await Movie.find();
    }

    res.json(movies);
  } catch (error) {
    console.error('Error fetching all movies with search query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET a movie by ID
router.get('/movies/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findOne({ _id: movieId });

    // Check if movie exists
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movie); 
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;