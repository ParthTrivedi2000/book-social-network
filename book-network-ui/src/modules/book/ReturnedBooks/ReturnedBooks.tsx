import { useState, useEffect } from 'react';
import { BookService } from '../../../app/services';
import { PageResponseBorrowedBookResponse, BorrowedBookResponse } from '../../../app/services';
import { Container, Table, Pagination } from './ReturnedBooks.styled';
import { BookServiceWrapper } from '../../../app/services/interceptor/BookServiceWrapper';


const ReturnedBooks = () => {
  console.log("Inside ReturnedBooks Component")
   const [returnedBooks, setReturnedBooks] = useState<PageResponseBorrowedBookResponse>({});
   const [message, setMessage] = useState<string>('');
   const [level, setLevel] = useState<'success' | 'error'>('success');
   const [page, setPage] = useState<number>(0); // Current page state
   const [size] = useState<number>(5); // You can adjust the default size here if needed
   const [pages, setPages] = useState<number[]>([]); // Pages for pagination
 
   useEffect(() => {
     findAllReturnedBooks(); // Load books when the component mounts
   }, [page]); // Reload when the page changes
 
   const findAllReturnedBooks = () => {
    //  BookService.findAllReturnedBooks(page, size)  // Pass page and size as separate arguments
    BookServiceWrapper.findAllReturnedBooks(page, size)  // Pass page and size as separate arguments
       .then((resp) => {
         setReturnedBooks(resp);
         setPages(Array(resp.totalPages).fill(0).map((_, i) => i)); // Prepare pagination
       })
       .catch((err) => {
         setMessage('Error loading books');
         setLevel('error');
       });
   };
 
   const goToPage = (newPage: number) => {
     setPage(newPage); // Update page state to load new page data
   };
 
   const goToFirstPage = () => setPage(0);
   const goToLastPage = () => setPage(returnedBooks.totalPages ? returnedBooks.totalPages - 1 : 0);
   const goToPreviousPage = () => setPage(prevPage => Math.max(0, prevPage - 1));
   const goToNextPage = () => setPage(prevPage => (returnedBooks.totalPages ? Math.min(returnedBooks.totalPages - 1, prevPage + 1) : prevPage));
 
   const approveBookReturn = (book: BorrowedBookResponse) => {
    console.log("approveBookReturn called", book.id, book.returned)
      if (!book.returned || book.id === undefined) { 
        return; // Ensure we don't proceed if book.id is undefined
      }
  
      // Corrected: Pass the book's id directly as a number
      // Now safely call approveReturnBorrowedBook with book.id
      // BookService.approveReturnBorrowedBook(book.id)
      BookServiceWrapper.approveReturnBorrowedBook(book.id)
        .then(() => {
          setLevel('success');
          setMessage('Book return approved');
          findAllReturnedBooks(); // Reload the books after approval
        })
        .catch(() => {
          setMessage('Error approving return');
          setLevel('error');
        });
    };
 
    return (
      <Container>
        <h2>My Returned Books</h2>
        {message && (
          <div className={`alert ${level === 'error' ? 'alert-danger' : 'alert-success'}`}>
            <p>{message}</p>
          </div>
        )}
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {returnedBooks.content?.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.authorName}</td>
                <td>{book.isbn}</td>
                <td><i className="fas fa-star text-warning"></i> {book.rate}</td>
                <td>
                  <div className="d-flex gap-2">
                    <i className={book.returned ? "fa-regular fa-paper-plane text-primary" : "fa-solid fa-paper-plane text-success"}></i>
                    <i 
                      className={`fa-solid fa-circle-check ${book.returnApproved ? 'text-success' : ''}`} 
                      onClick={() => approveBookReturn(book)} style={{cursor: 'pointer'}}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <button onClick={goToFirstPage} disabled={page === 0}>
            <i className="fa-solid fa-angles-left"></i>
          </button>
          <button onClick={goToPreviousPage} disabled={page === 0}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          {pages.map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => goToPage(pageIndex)}
              className={page === pageIndex ? 'active' : ''}
            >
              {pageIndex + 1}
            </button>
          ))}
          <button onClick={goToNextPage} disabled={page === (returnedBooks.totalPages || 0) - 1}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <button onClick={goToLastPage} disabled={page === (returnedBooks.totalPages || 0) - 1}>
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </Pagination>
      </Container>
    );
  };
  
  export default ReturnedBooks;

