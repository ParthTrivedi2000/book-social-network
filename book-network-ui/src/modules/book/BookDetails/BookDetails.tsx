import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookService, FeedbackService, BookResponse, FeedbackResponse, PageResponseFeedbackResponse } from '../../../app/services';
import { CoverImage,PaginationWrapper,BookDetailsWrapper, BookInfo } from './BookDetails.styled';
import Rating from '../Rating/Rating';
import { BookServiceWrapper } from '../../../app/services/interceptor/BookServiceWrapper';

const BookDetails: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<BookResponse | null>(null);
  const [feedbacks, setFeedbacks] = useState<PageResponseFeedbackResponse | null>(null);
  const [page, setPage] = useState(0);
  const [size] = useState(5);

  useEffect(() => {
    if (bookId) {
      // BookService.findById(Number(bookId)).then((book) => {
        BookServiceWrapper.findById(Number(bookId)).then((book) => {
        setBook(book);
        fetchFeedbacks();
      });
    }
  }, [bookId]);

  const fetchFeedbacks = () => {
    if (bookId) {
      FeedbackService.findAllFeedbackByBook(
        Number(bookId),
        page,
        size,
      ).then((data) => {
        setFeedbacks(data);
      });
    }
  };

  const goToPage = (page: number) => {
    setPage(page);
    fetchFeedbacks();
  };

  const goToFirstPage = () => {
    setPage(0);
    fetchFeedbacks();
  };

  const goToPreviousPage = () => {
    setPage((prev) => prev - 1);
    fetchFeedbacks();
  };

  const goToNextPage = () => {
    setPage((prev) => prev + 1);
    fetchFeedbacks();
  };

  const goToLastPage = () => {
    if (feedbacks) {
      setPage(feedbacks.totalPages ? feedbacks.totalPages - 1 : 0);
      fetchFeedbacks();
    }
  };

  const isLastPage = feedbacks && page === (feedbacks.totalPages || 0) - 1;

  return (
    <BookDetailsWrapper>
      <div className="d-flex gap-2">
        <CoverImage>
          <img
            className="rounded-1"
            width="100%"
            height="100%"
            src={
              book?.cover
                ? `data:image/jpg;base64,${book.cover}`
                : 'https://source.unsplash.com/user/c_v_r/1900x800'
            }
            alt="Book Cover"
          />
        </CoverImage>
        <BookInfo>
          <h2>
            <i className="fa-solid fa-book"></i>&nbsp;{book?.title}
          </h2>
          <h4>
            <i className="fa-solid fa-user-check"></i>&nbsp;{book?.authorName}
          </h4>
          <h5>
            <i className="fas fa-code"></i>&nbsp;{book?.isbn}
          </h5>
          <h6 className="card-subtitle fs-6 text-secondary">
            <i className="fas fa-user"></i>&nbsp;{book?.owner}
          </h6>
          <div className="d-flex gap-2">
            <Rating rating={book?.rate || 0} onRatingClick={()=>{}}/>
            <span>{book?.rate}</span> ({(feedbacks?.content||[]).length || 0} feedbacks)
          </div>
          <hr />
          <p>{book?.synopsis}</p>
        </BookInfo>
      </div>

      <div className="d-flex flex-column justify-content-end">
        {(feedbacks?.content || []).map((feedback, index) => (
          <div key={index} className="d-flex gap-2">
            <Rating rating={feedback.note || 0} onRatingClick={()=>{}} />
            <strong>{feedback.note}</strong>
            <p>{feedback.comment}</p>
          </div>
        ))}
      </div>

      <PaginationWrapper>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                onClick={goToFirstPage}
                className={`page-link ${page === 0 ? 'disabled' : ''}`}
                href="javascript:void(0)"
                aria-label="Previous"
              >
                <i className="fa-solid fa-angles-left"></i>
              </a>
            </li>
            <li className="page-item">
              <a
                onClick={goToPreviousPage}
                className={`page-link ${page === 0 ? 'disabled' : ''}`}
                href="javascript:void(0)"
                aria-label="Previous"
              >
                <i className="fa-solid fa-angle-left"></i>
              </a>
            </li>
            {Array.from({ length: feedbacks?.totalPages || 0 }, (_, index) => (
              <li key={index} className="page-item">
                <a
                  onClick={() => goToPage(index)}
                  className={`page-link ${page === index ? 'active' : ''}`}
                  href="javascript:void(0)"
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a
                onClick={goToNextPage}
                className={`page-link ${isLastPage ? 'disabled' : ''}`}
                href="javascript:void(0)"
                aria-label="Next"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </a>
            </li>
            <li className="page-item">
              <a
                onClick={goToLastPage}
                className={`page-link ${isLastPage ? 'disabled' : ''}`}
                href="javascript:void(0)"
                aria-label="Next"
                // className={isLastPage ? 'disabled' : ''}
              >
                <i className="fa-solid fa-angles-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </PaginationWrapper>
    </BookDetailsWrapper>
  );
};

export default BookDetails;
