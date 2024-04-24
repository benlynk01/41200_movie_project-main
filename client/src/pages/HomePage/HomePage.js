import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard/MovieCard';
import './HomePage.css';

function Homepage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRandomMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/random-movies`);
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
            setLoading(false);
        };
        getRandomMovies();
        console.log(movies)
    }, []); 

    return (
        <div className="container">
            <h1>Featured Movies</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="card-deck">
                    <div className="d-flex flex-wrap justify-content-center">
                        {movies.map((movie) => (
                            <div className="col" key={movie._id}>
                                <MovieCard
                                    movie={movie} // Pass the movie object as a prop
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Homepage;