import React from 'react';
import {RatingContainer, HalfStar, Star} from './Rating.styled';

interface RatingProps {
  rating: number;
  onRatingClick: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ rating, onRatingClick }) => {
  const maxRating = 5;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - Math.ceil(rating);

  const handleStarClick = (rating: number) => {
    onRatingClick(rating); // This triggers the parent callback
  };

  return (
    <RatingContainer>
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <Star
          key={`full-${index}`}
          className="fas fa-star text-warning"
          onClick={() => handleStarClick(index + 1)}
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <HalfStar
          className="fas fa-star-half-alt text-warning"
          onClick={() => handleStarClick(fullStars + 0.5)}
        />
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <Star
          key={`empty-${index}`}
          className="far fa-star"
          onClick={() => handleStarClick(fullStars + 1 + index)}
        />
      ))}
    </RatingContainer>
  );
};

export default Rating;

