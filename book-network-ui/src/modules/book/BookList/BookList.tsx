// import React, { useState, useEffect } from 'react';
// import {Container, Alert, Pagination, PaginationItem, PaginationList, BookListWrapper} from '../BookList/BookList.styled';
// import { BookService} from '../../../app/services/services/BookService';
// import {PageResponseBookResponse}  from '../../../app/services/models/PageResponseBookResponse'
// import {BookResponse} from '../../../app/services/models/BookResponse'
// import BookCard from '../BookCard/BookCard';
// import { BookServiceWrapper } from '../../../app/services/interceptor/BookServiceWrapper';


// const BookList: React.FC = () => {
//   const [bookResponse, setBookResponse] = useState<PageResponseBookResponse>({});
//   const [page, setPage] = useState(0);
//   const [size] = useState(5);
//   const [message, setMessage] = useState('');
//   const [level, setLevel] = useState<'success' | 'error'>('success');
//   const [pages, setPages] = useState<number[]>([]);

//   useEffect(() => {
//     findAllBooks();
//   }, [page]);

// const findAllBooks = async () => {
//    try {
//     //  const books = await BookService.findAllBooks(page, size); // Static call
//      const books = await BookServiceWrapper.findAllBooks(page, size); // Static call
//      setBookResponse(books);
//      setPages(Array.from({ length: books.totalPages ?? 0 }, (_, i) => i));
//    } catch (error) {
//      setMessage('Error loading books');
//      setLevel('error');
//    }
//  };

//  const borrowBook = async (book: BookResponse) => {
//    setMessage('');
//    setLevel('success');
//    try {
//     //  await BookService.borrowBook(book.id as number);
//      await BookServiceWrapper.borrowBook(book.id as number);
//      setMessage('Book successfully added to your list');
//      setLevel('success');
//    } catch (error) {
//      setMessage('Error borrowing book');
//      setLevel('error');
//    }
//  };

//   const displayBookDetails = (book: BookResponse) => {
//     // Navigation logic
//     console.log('Displaying book details for', book);
//   };

//   const goToPage = (page: number) => {
//     setPage(page);
//   };

//   const goToFirstPage = () => {
//     setPage(0);
//   };

//   const goToPreviousPage = () => {
//     if (page > 0) setPage(page - 1);
//   };

//   const goToNextPage = () => setPage(prevPage => (bookResponse.totalPages ? Math.min(bookResponse.totalPages - 1, prevPage + 1) : prevPage));

//   const goToLastPage = () => {
//     setPage(bookResponse.totalPages ? bookResponse.totalPages - 1 : 0);
//   };

//   return (
//     <Container>
//       <h1>Hello</h1>
//       <h3>Books list</h3>
//       {message && (
//         <Alert level={level}>
//           <p>{message}</p>
//         </Alert>
//       )}

//       <BookListWrapper>
//         {bookResponse.content?.map((book) => (
//           <div key={book.id}>
//             <BookCard book={book} onBorrow={borrowBook} onShowDetails={displayBookDetails} manage={true} 
//             onShare = {() => {}} onArchive = {() => {}}
//             onAddToWaitingList = {() => {}} onEdit = {() => {}} onRate={()=>{}}
//             />
//           </div>
//         ))}
//       </BookListWrapper>

//       <Pagination>
//         <PaginationList>
//           <PaginationItem disabled={page === 0} onClick={goToFirstPage}>
//             <i className="fa-solid fa-angles-left"></i>
//           </PaginationItem>
//           <PaginationItem disabled={page === 0} onClick={goToPreviousPage}>
//             <i className="fa-solid fa-angle-left"></i>
//           </PaginationItem>
//           {pages.map((pageIndex) => (
//             <PaginationItem
//               key={pageIndex}
//               disabled={false}
//               onClick={() => goToPage(pageIndex)}
//             >
//               <span className={page === pageIndex ? 'active' : ''}>{pageIndex + 1}</span>
//             </PaginationItem>
//           ))}
//           <PaginationItem disabled={bookResponse.totalPages !== undefined ? page === bookResponse.totalPages - 1 : false} onClick={goToNextPage}>
//             <i className="fa-solid fa-chevron-right"></i>
//           </PaginationItem>
//           <PaginationItem disabled={bookResponse.totalPages !== undefined ? page === bookResponse.totalPages - 1 : false} onClick={goToLastPage}>
//             <i className="fa-solid fa-angles-right"></i>
//           </PaginationItem>
//         </PaginationList>
//       </Pagination>
//     </Container>
//   );
// };

// export default BookList;


// 3rd version:-
import React, { useState, useEffect } from 'react';
import { Container, Alert, Pagination, PaginationItem, PaginationList, BookListWrapper } from '../BookList/BookList.styled';
import { BookServiceWrapper } from '../../../app/services/interceptor/BookServiceWrapper';
import { PageResponseBookResponse } from '../../../app/services/models/PageResponseBookResponse';
import { BookResponse } from '../../../app/services/models/BookResponse';
import BookCard from '../BookCard/BookCard';

const BookList: React.FC = () => {
  console.log("Inside BookList");
  const [bookResponse, setBookResponse] = useState<PageResponseBookResponse>({});
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [message, setMessage] = useState('');
  const [level, setLevel] = useState<'success' | 'error'>('success');
  const [pages, setPages] = useState<number[]>([]);

  // Fetch the list of books from the service
  const findAllBooks = async () => {
    try {
      const books = await BookServiceWrapper.findAllBooks(page, size);
      setBookResponse(books);
      setPages(Array.from({ length: books.totalPages ?? 0 }, (_, i) => i));
    } catch (error) {
      setMessage('Error loading books');
      setLevel('error');
    }
  };

  // Call `findAllBooks` whenever the `page` changes
  useEffect(() => {
    findAllBooks();
  }, [page]);

  // Handle borrowing a book
  const borrowBook = async (book: BookResponse) => {
    setMessage('');
    setLevel('success');
    try {
      await BookServiceWrapper.borrowBook(book.id as number);
      setMessage('Book successfully added to your borrowed book list');
      setLevel('success');
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error?.message || 'Error borrowing book';
      console.log(errorMessage)
      setMessage(errorMessage || 'Error borrowing book');
      setLevel('error');
    }
  };

  // Display book details (this is for navigation, for now just logs the book)
  const displayBookDetails = (book: BookResponse) => {
    console.log('Displaying book details for', book);
  };

  // Pagination logic
  const goToPage = (page: number) => {
    setPage(page);
  };

  const goToFirstPage = () => {
    setPage(0);
  };

  const goToPreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const goToNextPage = () => {
    setPage(prevPage => (bookResponse.totalPages ? Math.min(bookResponse.totalPages - 1, prevPage + 1) : prevPage));
  };

  const goToLastPage = () => {
    setPage(bookResponse.totalPages ? bookResponse.totalPages - 1 : 0);
  };

  return (
    <Container>
      <h3>Books list</h3>

      {message && (
        <Alert level={level}>
          <p>{message}</p>
        </Alert>
      )}


      <BookListWrapper>
        {bookResponse.content?.map((book) => (
          <div key={book.id}>
            <BookCard
              book={book}
              onBorrow={borrowBook}
              onShowDetails={displayBookDetails}
              manage={false}
              onShare={() => {}}
              onArchive={() => {}}
              onAddToWaitingList={() => {}}
              onEdit={() => {}}
              onRate={() => {}}
            />
          </div>
        ))}
      </BookListWrapper>

      <Pagination>
        <PaginationList>
          {/* First Page */}
          <PaginationItem disabled={page === 0} onClick={goToFirstPage}>
            <i className="fa-solid fa-angles-left"></i>
          </PaginationItem>
          {/* Previous Page */}
          <PaginationItem disabled={page === 0} onClick={goToPreviousPage}>
            <i className="fa-solid fa-angle-left"></i>
          </PaginationItem>

          {/* Page Numbers */}
          {pages.map((pageIndex) => (
            <PaginationItem key={pageIndex} disabled={false} onClick={() => goToPage(pageIndex)}>
              <span className={page === pageIndex ? 'active' : ''}>{pageIndex + 1}</span>
            </PaginationItem>
          ))}

          {/* Next Page */}
          <PaginationItem disabled={bookResponse.totalPages !== undefined ? page === bookResponse.totalPages - 1 : false} onClick={goToNextPage}>
            <i className="fa-solid fa-chevron-right"></i>
          </PaginationItem>

          {/* Last Page */}
          <PaginationItem disabled={bookResponse.totalPages !== undefined ? page === bookResponse.totalPages - 1 : false} onClick={goToLastPage}>
            <i className="fa-solid fa-angles-right"></i>
          </PaginationItem>
        </PaginationList>
      </Pagination>
    </Container>
  );
};

export default BookList;
