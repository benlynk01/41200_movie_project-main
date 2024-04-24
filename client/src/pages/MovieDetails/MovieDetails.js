import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import images from '../../components/images/noimage.jpeg';
import './MovieDetails.css';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/movies/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
            setLoading(false);
        };

        fetchMovie();
    }, [id]);

    return (
        <div className="movie-detail-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="movie-container">
                    <div className="movie-thumbnail-container">
                        <img src={movie.thumbnail || images} alt={movie.title} className="movie-thumbnail" />
                    </div>
                    <div className="movie-details">
                        <h1>{movie.title}</h1>
                        <p><strong>Year Released:</strong> {movie.year}</p>
                        <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                        <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
                        <p>{movie.extract}</p>
                        <div className="button-container">
                            <Button variant="btn btn-danger">Add to Watchlist</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetails;
