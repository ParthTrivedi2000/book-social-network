import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookResponse, PageResponseBookResponse, BookService } from '../../../app/services';
import BookCard from '../BookCard/BookCard';
import { Pagination, PaginationItem, PaginationLink, Button } from './MyBooks.styled';
import { BookServiceWrapper } from '../../../app/services/interceptor/BookServiceWrapper';

const MyBooks: React.FC = () => {
  console.log("Inside MyBooks");
  const [bookResponse, setBookResponse] = useState<PageResponseBookResponse>({ content: [] });
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(5); // You can adjust this as needed
  const [pages, setPages] = useState<number[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    findAllBooks();
  }, [page]);

  const findAllBooks = async () => {
    try {
      // const books = await BookService.findAllBooksByOwner(page, size);
      const books = await BookServiceWrapper.findAllBooksByOwner(page, size);
      setBookResponse(books);
      const totalPages = books.totalPages || 0; // Ensure totalPages is a number
      setPages(Array.from({ length: totalPages }, (_, i) => i)); // Create pages array
    } catch (error) {
      console.error('Error fetching books:', error);
      
    }
  };

  const goToPage = (pageIndex: number) => {
    setPage(pageIndex);
  };

  const goToFirstPage = () => {
    setPage(0);
  };

  const goToPreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const goToLastPage = () => {
    if (bookResponse.totalPages) setPage(bookResponse.totalPages - 1);
  };

  const goToNextPage = () => {
    if (page < (bookResponse.totalPages || 1) - 1) setPage(page + 1);
  };

  const isLastPage = () => {
    return page === (bookResponse.totalPages || 1) - 1;
  };

  const archiveBook = async (book: BookResponse) => {
    try {
      // await BookService.updateArchivedStatus(book.id as number);
      await BookServiceWrapper.updateArchivedStatus(book.id as number);
    setBookResponse(prevResponse => ({
      ...prevResponse,
      content: (prevResponse.content || []).map(b => 
        b.id === book.id ? { ...b, archived: !b.archived } : b
        ),
      }));
    } catch (error) {
      console.error('Error archiving book:', error);
    }
  };

  const shareBook = async (book: BookResponse) => {
    try {
      // await BookService.updateShareableStatus(book.id as number);
      await BookServiceWrapper.updateShareableStatus(book.id as number);
      setBookResponse(prevResponse => ({
        ...prevResponse,
        content: (prevResponse.content||[]).map(b => 
          b.id === book.id ? { ...b, shareable: !b.shareable } : b
        ),
      }));
    } catch (error) {
      console.error('Error sharing book:', error);
    }
  };

  const editBook = (book: BookResponse) => {
    navigate(`/books/manage/${book.id}`);
  };

  return (
    <div>
      <h3>My books list</h3>
      <hr />
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => navigate('/books/manage')}>
          <i className="fas fa-plus"></i>&nbsp;New book
        </Button>
      </div>
      <div className="d-flex justify-content-start gap-4 flex-wrap">
        {(bookResponse.content||[]).map(book => (
          <BookCard
            key={book.id}
            book={book}
            manage={true} // Or false depending on the context
            onShare={() => shareBook(book)}
            onArchive={() => archiveBook(book)}
            onEdit={() => editBook(book)}
            onAddToWaitingList={()=>{}} // Empty function if not needed
            onBorrow={()=>{}} // Empty function if not needed
            onShowDetails={()=>{}} // Empty function if not needed
            onRate={()=>{}}
          />
        ))}
      </div>
      <Pagination>
        <PaginationItem>
          <PaginationLink
            onClick={goToFirstPage}
            disabled={page === 0}
            aria-label="First"
          >
            <i className="fa-solid fa-angles-left"></i>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={goToPreviousPage}
            disabled={page === 0}
            aria-label="Previous"
          >
            <i className="fa-solid fa-angle-left"></i>
          </PaginationLink>
        </PaginationItem>
        {pages.map(pageIndex => (
          <PaginationItem key={pageIndex}>
            <PaginationLink
              onClick={() => goToPage(pageIndex)}
              active={page === pageIndex}
            >
              {pageIndex + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            onClick={goToNextPage}
            disabled={isLastPage()}
            aria-label="Next"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={goToLastPage}
            disabled={isLastPage()}
            aria-label="Last"
          >
            <i className="fa-solid fa-angles-right"></i>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default MyBooks;