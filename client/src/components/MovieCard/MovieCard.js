import React from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import './MovieCard.css'
import images from '../images/noimage.jpeg'

const MovieCard = ({ movie }) => {
    const thumbnailUrl = movie.thumbnail ? movie.thumbnail : images;

    return (
        <div className="movie-card">
            <Card className = "bootstrap-card bg-dark text-white"style={{ width: '18rem', margin: '10px' }}>
                <div className="thumbnail-wrapper">
                    <Card.Img src={thumbnailUrl} alt={movie.title} className="thumbnail" />
                </div>
                <Card.Body className = "card-body">
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Released Year: {movie.year}</Card.Text>
                    <Button variant="btn btn-danger" as={Link} to={`/movies/${movie._id}`}>View Details</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MovieCard;