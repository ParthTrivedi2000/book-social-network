import React, { useState } from 'react';
import { BookResponse } from '../../../app/services';
import Rating from '../Rating/Rating';
import { Card, CardBody, CardFooter, CardTitle, CardSubtitle, CardText, Icon, CardImage, ButtonGroup } from '../BookCard/BookCard.styled';

interface BookCardProps {
  book: BookResponse;
  manage: boolean;
  onShare: (book: BookResponse) => void;
  onArchive: (book: BookResponse) => void;
  onAddToWaitingList: (book: BookResponse) => void;
  onBorrow: (book: BookResponse) => void;
  onEdit: (book: BookResponse) => void;
  onShowDetails: (book: BookResponse) => void;
  onRate: (book: BookResponse, rating: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  manage,
  onShare = () => {}, // Default to no-op function
  onArchive = () => {},
  onAddToWaitingList = () => {},
  onBorrow = () => {},
  onEdit = () => {},
  onShowDetails = () => {},
  onRate = () => {},
}) => {
  const bookCover = book.cover ? `data:image/jpg;base64,${book.cover}` : 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f';
  
  // State to hold the book rating (could be handled in parent as well)
  const [rating, setRating] = useState(book.rate || 0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onRate(book, newRating);  // Pass the updated rating back to the parent
  };

  return (
    <Card className={book.shareable ? 'border-success' : book.archived ? 'border-warning' : ''}>
      <CardImage src={bookCover} alt="Book Cover" height="200" />
      <CardBody>
        <CardTitle>
          <i className="fa-solid fa-book"></i>&nbsp;{book.title}
        </CardTitle>
        <CardSubtitle>
          <i className="fa-solid fa-user-check"></i>&nbsp;{book.authorName}
        </CardSubtitle>
        <CardSubtitle>
          <i className="fas fa-code"></i>&nbsp;{book.isbn}
        </CardSubtitle>
        <CardSubtitle>
          <i className="fas fa-user"></i>&nbsp;{book.owner}
        </CardSubtitle>
        <hr />
        <CardText>{book.synopsis}</CardText>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Rating rating={rating} onRatingClick={handleRatingChange} />
          {/* {book.rate && <span className="fw-bold">{book.rate}</span>} */}
          {rating && <span className="fw-bold">{rating}</span>}
        </ButtonGroup>
        <ButtonGroup>
          {!manage && (
            <>
              <Icon onClick={() => onShowDetails(book)} className="fas fa-circle-info text-primary" />
              <Icon onClick={() => onBorrow(book)} className="fas fa-list-check text-primary" />
              <Icon onClick={() => onAddToWaitingList(book)} className="fas fa-heart text-danger" />
            </>
          )}
          {manage && (
            <>
              <Icon onClick={() => onEdit(book)} className="fas fa-edit text-success" />
              <Icon onClick={() => onShare(book)} className="fas fa-share-nodes text-primary" />
              <Icon onClick={() => onArchive(book)} className="fas fa-archive text-danger" />
            </>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
