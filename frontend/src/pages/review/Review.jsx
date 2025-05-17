import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import styles from './Review.module.css';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        gameName: "",
        rating: 5,
        comment: "",
    });
    const [selectedGame, setSelectedGame] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { authUser } = useAuthContext();

    const games = [
        "TicTacToe",
        "Rock Paper Scissors",
        "Online Games",
        "Download Games"
    ];

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get("/api/reviews");
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!authUser) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            await axios.post("/api/reviews", {
                ...newReview,
                userId: authUser._id,
                username: authUser.username,
            });
            setNewReview({
                gameName: "",
                rating: 5,
                comment: "",
            });
            fetchReviews();
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (reviewId) => {
        if (!authUser) {
            navigate("/login");
            return;
        }

        try {
            await axios.delete(`/api/reviews/${reviewId}`);
            fetchReviews();
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    return (
        <div className={styles['review-page']}>
            <h1>Game Reviews</h1>
            
            <div className={styles['review-filter']}>
                <select 
                    value={selectedGame} 
                    onChange={(e) => setSelectedGame(e.target.value)}
                >
                    <option value="">All Games</option>
                    {games.map(game => (
                        <option key={game} value={game}>{game}</option>
                    ))}
                </select>
            </div>

            <div className={styles['review-form']}>
                <h2>Write a Review</h2>
                <form onSubmit={handleSubmit}>
                    <select 
                        value={newReview.gameName} 
                        onChange={(e) => setNewReview({ ...newReview, gameName: e.target.value })}
                        required
                    >
                        <option value="">Select a Game</option>
                        {games.map(game => (
                            <option key={game} value={game}>{game}</option>
                        ))}
                    </select>

                    <div className={styles['rating-input']}>
                        <label>Rating:</label>
                        <input 
                            type="number" 
                            min="1" 
                            max="5" 
                            value={newReview.rating} 
                            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                            required
                        />
                    </div>

                    <textarea
                        placeholder="Write your review..."
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            </div>

            <div className={styles['reviews-list']}>
                {reviews
                    .filter((review) => !selectedGame || review.gameName === selectedGame)
                    .map((review) => (
                        <div key={review._id} className={styles['review-card']}>
                            <div className={styles['review-header']}>
                                <h3>{review.gameName}</h3>
                                <div className={styles['review-meta']}>
                                    <span>By {review.username}</span>
                                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className={styles.rating}>Rating: {review.rating}/5</div>
                            <p>{review.comment}</p>
                            {authUser && authUser._id === review.userId && (
                                <button 
                                    className={styles['delete-button']}
                                    onClick={() => handleDelete(review._id)}
                                >
                                    Delete Review
                                </button>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Review; 