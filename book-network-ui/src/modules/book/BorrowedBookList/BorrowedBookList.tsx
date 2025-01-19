// import React, { useEffect, useState } from 'react';
// import { BookService, FeedbackRequest, PageResponseBorrowedBookResponse, BorrowedBookResponse } from '../../../app/services';
// import { FeedbackService } from '../../../app/services';
// import { Container, Table, Pagination, Button, Form, FormGroup, Label, TextArea, RangeInput } from './BorrowedBookList.styled';  // Assuming you've styled your components
// import { BookServiceWrapper } from '../../../app/services/interceptor/BookServiceWrapper';

// const BorrowedBookList = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState<PageResponseBorrowedBookResponse>({ totalPages: 0 });
//   const [selectedBook, setSelectedBook] = useState<BorrowedBookResponse | undefined>(undefined);
//   const [feedbackRequest, setFeedbackRequest] = useState<FeedbackRequest>({ bookId: 0, comment: '', note: 0 });
//   const [page, setPage] = useState<number>(0);
//   const [pages, setPages] = useState<number[]>([]);

//   useEffect(() => {
//     findAllBorrowedBooks();
//   }, [page]);

//   const findAllBorrowedBooks = () => {
//     // BookService.findAllBorrowedBooks(page, 5)
//     BookServiceWrapper.findAllBorrowedBooks(page, 5)
//       .then((resp: PageResponseBorrowedBookResponse) => {
//         setBorrowedBooks(resp);
//         setPages(Array(resp.totalPages ?? 0).fill(0).map((_, i) => i)); // Fallback to 0 if totalPages is undefined
//       })
//       .catch((err) => {
//         console.error('Error loading borrowed books:', err);
//       });
//   };

//   const returnBorrowedBook = (book: BorrowedBookResponse) => {
//     setSelectedBook(book);
//     setFeedbackRequest({ ...feedbackRequest, bookId: book.id ?? 0 }); // Default to 0 if book.id is undefined
//   };

//   const returnBook = (withFeedback: boolean) => {
//     if (selectedBook?.id) {
//       // BookService.returnBorrowedBook(selectedBook.id)
//       BookServiceWrapper.returnBorrowedBook(selectedBook.id)
//         .then(() => {
//           if (withFeedback) {
//             giveFeedback();
//           }
//           setSelectedBook(undefined);
//           findAllBorrowedBooks();
//         })
//         .catch((err) => {
//           console.error('Error returning book:', err);
//         });
//     }
//   };

//   const giveFeedback = () => {
//     FeedbackService.saveFeedback(feedbackRequest)
//       .then(() => {
//         console.log('Feedback saved');
//       })
//       .catch((err) => {
//         console.error('Error saving feedback:', err);
//       });
//   };

//   const goToPage = (newPage: number) => {
//     setPage(newPage);
//   };

//   const goToFirstPage = () => setPage(0);
//   const goToLastPage = () => setPage((borrowedBooks.totalPages ?? 0) - 1);
//   const goToPreviousPage = () => setPage(prevPage => Math.max(0, prevPage - 1));
//   // const goToNextPage = () => setPage(prevPage => Math.min((borrowedBooks.totalPages ?? 0) - 1, prevPage + 1)); // wrong logic. bec page is keeps going in -ve as well.
//   const goToNextPage = () => setPage(prevPage => (borrowedBooks.totalPages ? Math.min(borrowedBooks.totalPages - 1, prevPage + 1) : prevPage));

//   return (
//     <Container>
//       <h2>My Borrowed Books</h2>

//       {/* Form for returning a book with feedback */}
//       {selectedBook && (
//         <div className="d-flex flex-column col-6">
//           <h2>Return and Share Feedback</h2>
//           <div className="d-flex flex-column col-12">
//             <div className="d-flex">
//               <div className="col-1"><strong>Title</strong></div>
//               <div className="col-11">{selectedBook.title}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1"><strong>Author</strong></div>
//               <div className="col-11">{selectedBook.authorName}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1"><strong>ISBN</strong></div>
//               <div className="col-11">{selectedBook.isbn}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1"><strong>Rate</strong></div>
//               <div className="col-11">{selectedBook.rate}</div>
//             </div>
//           </div>

//           {/* Feedback Form */}
//           <hr />
//           <Form>
//             <FormGroup>
//               <RangeInput
//                 type="range"
//                 value={feedbackRequest.note}
//                 onChange={(e) => setFeedbackRequest({ ...feedbackRequest, note: parseFloat(e.target.value) })}
//                 min="0"
//                 max="5"
//                 step="0.5"
//               />
//               <span>{feedbackRequest.note}</span>
//             </FormGroup>
//             <FormGroup>
//               <Label htmlFor="feedback">Feedback</Label>
//               <TextArea
//                 id="feedback"
//                 placeholder="Enter your feedback"
//                 value={feedbackRequest.comment}
//                 onChange={(e) => setFeedbackRequest({ ...feedbackRequest, comment: e.target.value })}
//               />
//             </FormGroup>
//             <div className="d-flex justify-content-end gap-2">
//               <Button onClick={() => returnBook(true)} className="btn-outline-primary">
//                 <i className="fas fa-save"></i> Rate & Return
//               </Button>
//               <Button onClick={() => returnBook(false)} className="btn-outline-success">
//                 <i className="fa-solid fa-paper-plane"></i> Just Return
//               </Button>
//               <Button as="a" href="/books/my-books" className="text-danger">
//                 <i className="fas fa-times"></i> Cancel
//               </Button>
//             </div>
//           </Form>
//         </div>
//       )}

//       {/* Book List */}
//       {!selectedBook && (
//         <Table>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Title</th>
//               <th>Author</th>
//               <th>ISBN</th>
//               <th>Rate</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {borrowedBooks.content?.map((book, index) => (
//               <tr key={book.id}>
//                 <td>{index + 1}</td>
//                 <td>{book.title}</td>
//                 <td>{book.authorName}</td>
//                 <td>{book.isbn}</td>
//                 <td><i className="fas fa-star text-warning"></i> {book.rate}</td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <i className={book.returned ? 'fa-regular fa-paper-plane text-primary' : 'fa-solid fa-paper-plane text-success'} onClick={() => returnBorrowedBook(book as BorrowedBookResponse)}></i>
//                     <i className={`fa-solid fa-circle-check ${book.returnApproved ? 'text-success' : ''}`}></i>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}

//       {/* Pagination */}
//       <Pagination>
//         <Button onClick={goToFirstPage} disabled={page === 0}><i className="fa-solid fa-angles-left"></i></Button>
//         <Button onClick={goToPreviousPage} disabled={page === 0}><i className="fa-solid fa-angle-left"></i></Button>
//         {pages.map(pageIndex => (
//           <Button key={pageIndex} onClick={() => goToPage(pageIndex)} className={page === pageIndex ? 'active' : ''}>
//             {pageIndex + 1}
//           </Button>
//         ))}
//         <Button onClick={goToNextPage} disabled={page === (borrowedBooks.totalPages || 0) - 1}><i className="fa-solid fa-chevron-right"></i></Button>
//         <Button onClick={goToLastPage} disabled={page === (borrowedBooks.totalPages || 0) - 1}><i className="fa-solid fa-angles-right"></i></Button>
//       </Pagination>
//     </Container>
//   );
// };

// export default BorrowedBookList;

// // 2nd Version :-
// import React, { useEffect, useState } from 'react';
// import { BookService, FeedbackService } from '../../../app/services';
// import { Container, Table, Pagination, Button, Form, FormGroup, Label, TextArea, RangeInput } from './BorrowedBookList.styled';
// import { BorrowedBookResponse, PageResponseBorrowedBookResponse, FeedbackRequest } from '../../../app/services';
// import { BookServiceWrapper } from '../../../app/services/interceptor/BookServiceWrapper';

// const BorrowedBookList: React.FC = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState<PageResponseBorrowedBookResponse>({ totalPages: 0, content: [] });
//   const [selectedBook, setSelectedBook] = useState<BorrowedBookResponse | undefined>(undefined);
//   const [feedbackRequest, setFeedbackRequest] = useState<FeedbackRequest>({ bookId: 0, comment: '', note: 0 });
//   const [page, setPage] = useState<number>(0);
//   const [pages, setPages] = useState<number[]>([]);

//   useEffect(() => {
//     findAllBorrowedBooks();
//   }, [page]);

//   const findAllBorrowedBooks = () => {
//     BookServiceWrapper.findAllBorrowedBooks(page, 5)
//       .then((resp: PageResponseBorrowedBookResponse) => {
//         console.log(resp);
//         setBorrowedBooks(resp);
//         setPages(Array(resp.totalPages ?? 0).fill(0).map((_, i) => i));
//       })
//       .catch((err) => {
//         console.error('Error loading borrowed books:', err);
//       });
//   };

//   const returnBorrowedBook = (book: BorrowedBookResponse) => {
//     setSelectedBook(book);
//     setFeedbackRequest({ ...feedbackRequest, bookId: book.id ?? 0 });
//   };

//   const returnBook = (withFeedback: boolean) => {
//     if (selectedBook?.id) {
//       BookServiceWrapper.returnBorrowedBook(selectedBook.id)
//         .then(() => {
//           if (withFeedback) {
//             giveFeedback();
//           }
//           setSelectedBook(undefined);
//           findAllBorrowedBooks();
//         })
//         .catch((err) => {
//           console.error('Error returning book:', err);
//         });
//     }
//   };

//   const giveFeedback = () => {
//     FeedbackService.saveFeedback(feedbackRequest)
//       .then(() => {
//         console.log('Feedback saved');
//       })
//       .catch((err) => {
//         console.error('Error saving feedback:', err);
//       });
//   };

//   const goToPage = (newPage: number) => {
//     setPage(newPage);
//   };

//   const goToFirstPage = () => setPage(0);
//   const goToLastPage = () => setPage((borrowedBooks.totalPages ?? 0) - 1);
//   const goToPreviousPage = () => setPage((prevPage) => Math.max(0, prevPage - 1));
//   const goToNextPage = () => setPage((prevPage) => (borrowedBooks.totalPages ? Math.min(borrowedBooks.totalPages - 1, prevPage + 1) : prevPage));

//   return (
//     <Container>
//       <h2>My Borrowed Books</h2>

//       {/* Form for returning a book with feedback */}
//       {selectedBook && (
//         <div className="d-flex flex-column col-6">
//           <h2>Return and Share Feedback</h2>
//           <div className="d-flex flex-column col-12">
//             <div className="d-flex">
//               <div className="col-1"><strong>Title</strong></div>
//               <div className="col-11 row-11">{selectedBook.title}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1"><strong>Author</strong></div>
//               <div className="col-11 row-11">{selectedBook.authorName}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1"><strong>ISBN</strong></div>
//               <div className="col-11">{selectedBook.isbn}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1"><strong>Rate</strong></div>
//               <div className="col-11 row-11">{selectedBook.rate}</div>
//             </div>
//           </div>

//           {/* Feedback Form */}
//           <hr />
//           <Form>
//             <FormGroup>
//               <RangeInput
//                 type="range"
//                 value={feedbackRequest.note}
//                 onChange={(e) => setFeedbackRequest({ ...feedbackRequest, note: parseFloat(e.target.value) })}
//                 min="0"
//                 max="5"
//                 step="0.5"
//               />
//               <span>{feedbackRequest.note}</span>
//             </FormGroup>
//             <FormGroup>
//               <Label htmlFor="feedback">Feedback</Label>
//               <TextArea
//                 id="feedback"
//                 placeholder="Enter your feedback"
//                 value={feedbackRequest.comment}
//                 onChange={(e) => setFeedbackRequest({ ...feedbackRequest, comment: e.target.value })}
//               />
//             </FormGroup>
//             <div className="d-flex justify-content-end gap-2">
//               <Button onClick={() => returnBook(true)} className="btn-outline-primary">
//                 <i className="fas fa-save"></i> Rate & Return
//               </Button>
//               <Button onClick={() => returnBook(false)} className="btn-outline-success">
//                 <i className="fa-solid fa-paper-plane"></i> Just Return
//               </Button>
//               <Button as="a" href="/books/my-books" className="text-danger">
//                 <i className="fas fa-times"></i> Cancel
//               </Button>
//             </div>
//           </Form>
//         </div>
//       )}

//       {/* Book List */}
//       {!selectedBook && (
//         <Table>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Title</th>
//               <th>Author</th>
//               <th>ISBN</th>
//               <th>Rate</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {borrowedBooks.content?.map((book, index) => (
//               <tr key={book.id}>
//                 <td>{index + 1}</td>
//                 <td>{book.title}</td>
//                 <td>{book.authorName}</td>
//                 <td>{book.isbn}</td>
//                 <td><i className="fas fa-star text-warning"></i> {book.rate}</td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <i className={book.returned ? 'fa-regular fa-paper-plane text-primary' : 'fa-solid fa-paper-plane text-success'} onClick={() => returnBorrowedBook(book as BorrowedBookResponse)}></i>
//                     <i className={`fa-solid fa-circle-check ${book.returnApproved ? 'text-success' : ''}`}></i>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}

//       {/* Pagination */}
//       <Pagination>
//         <Button onClick={goToFirstPage} disabled={page === 0}><i className="fa-solid fa-angles-left"></i></Button>
//         <Button onClick={goToPreviousPage} disabled={page === 0}><i className="fa-solid fa-angle-left"></i></Button>
//         {pages.map((pageIndex) => (
//           <Button key={pageIndex} onClick={() => goToPage(pageIndex)} className={page === pageIndex ? 'active' : ''}>
//             {pageIndex + 1}
//           </Button>
//         ))}
//         <Button onClick={goToNextPage} disabled={page === (borrowedBooks.totalPages || 0) - 1}><i className="fa-solid fa-chevron-right"></i></Button>
//         <Button onClick={goToLastPage} disabled={page === (borrowedBooks.totalPages || 0) - 1}><i className="fa-solid fa-angles-right"></i></Button>
//       </Pagination>
//     </Container>
//   );
// };

// export default BorrowedBookList;


// //3rd Version:-
// import React, { useEffect, useState } from 'react';
// import { BookServiceWrapper } from '../../../app/services/interceptor/BookServiceWrapper';
// import { FeedbackService } from '../../../app/services';
// import { Container, Table, Pagination, Button, Form, FormGroup, Label, TextArea, RangeInput } from './BorrowedBookList.styled';
// import { BorrowedBookResponse, PageResponseBorrowedBookResponse, FeedbackRequest, BookResponse } from '../../../app/services';

// const BorrowedBookList: React.FC = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState<PageResponseBorrowedBookResponse>({ totalPages: 0, content: [] });
//   const [selectedBook, setSelectedBook] = useState<BookResponse | undefined>(undefined);
//   const [feedbackRequest, setFeedbackRequest] = useState<FeedbackRequest>({ bookId: 0, comment: '', note: 0 });
//   const [page, setPage] = useState<number>(0);
//   const [pages, setPages] = useState<number[]>([]);

//   useEffect(() => {
//     findAllBorrowedBooks();
//   }, [page]);

//   const findAllBorrowedBooks = () => {
//     BookServiceWrapper.findAllBorrowedBooks(page, 5)
//       .then((resp: PageResponseBorrowedBookResponse) => {
//         setBorrowedBooks(resp);
//         setPages(Array(resp.totalPages ?? 0).fill(0).map((_, i) => i));
//       })
//       .catch((err) => {
//         console.error('Error loading borrowed books:', err);
//       });
//   };

//   const returnBorrowedBook = (book: BorrowedBookResponse) => {
//     setSelectedBook(book);
//     setFeedbackRequest({ ...feedbackRequest, bookId: book.id ?? 0 });
//   };

//   const returnBook = (withFeedback: boolean) => {
//     if (selectedBook?.id) {
//       BookServiceWrapper.returnBorrowedBook(selectedBook.id)
//         .then(() => {
//           if (withFeedback) {
//             giveFeedback();
//           }
//           setSelectedBook(undefined);
//           findAllBorrowedBooks();
//         })
//         .catch((err) => {
//           console.error('Error returning book:', err);
//         });
//     }
//   };

//   const giveFeedback = () => {
//     FeedbackService.saveFeedback(feedbackRequest)
//       .then(() => {
//         console.log('Feedback saved');
//       })
//       .catch((err) => {
//         console.error('Error saving feedback:', err);
//       });
//   };

//   const goToPage = (newPage: number) => {
//     setPage(newPage);
//   };

//   const goToFirstPage = () => setPage(0);
//   const goToLastPage = () => setPage((borrowedBooks.totalPages ?? 0) - 1);
//   const goToPreviousPage = () => setPage((prevPage) => Math.max(0, prevPage - 1));
//   const goToNextPage = () => setPage((prevPage) => (borrowedBooks.totalPages ? Math.min(borrowedBooks.totalPages - 1, prevPage + 1) : prevPage));
  
//   return (
//     <Container>
//       <h2>My Borrowed Books</h2>

//       {/* Form for returning a book with feedback */}
//       {selectedBook && (
//         <div className="d-flex flex-column col-6">
//           <h2>Return and Share Feedback</h2>
//           <div className="d-flex flex-column col-12">
//             <div className="d-flex">
//               <div className="col-1"><strong>Title</strong></div>
//               <div className="col-11">{selectedBook.title}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1"><strong>Author</strong></div>
//               <div className="col-11">{selectedBook.authorName}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1"><strong>ISBN</strong></div>
//               <div className="col-11">{selectedBook.isbn}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1"><strong>Rate</strong></div>
//               <div className="col-11">{selectedBook.rate}</div>
//             </div>
//           </div>

//           {/* Feedback Form */}
//           <hr />
//           <Form>
//             <FormGroup>
//               <RangeInput
//                 type="range"
//                 value={feedbackRequest.note}
//                 onChange={(e) => setFeedbackRequest({ ...feedbackRequest, note: parseFloat(e.target.value) })}
//                 min="0"
//                 max="5"
//                 step="0.5"
//               />
//               <span>{feedbackRequest.note}</span>
//             </FormGroup>
//             <FormGroup>
//               <Label htmlFor="feedback">Feedback</Label>
//               <TextArea
//                 id="feedback"
//                 placeholder="Enter your feedback"
//                 value={feedbackRequest.comment}
//                 onChange={(e) => setFeedbackRequest({ ...feedbackRequest, comment: e.target.value })}
//               />
//             </FormGroup>
//             <div className="d-flex justify-content-end gap-2">
//               <Button onClick={() => returnBook(true)} className="btn-outline-primary">
//                 <i className="fas fa-save"></i> Rate & Return
//               </Button>
//               <Button onClick={() => returnBook(false)} className="btn-outline-success">
//                 <i className="fa-solid fa-paper-plane"></i> Just Return
//               </Button>
//               <Button as="a" href="/books/my-books" className="text-danger">
//                 <i className="fas fa-times"></i> Cancel
//               </Button>
//             </div>
//           </Form>
//         </div>
//       )}

//       {/* Book List */}
//       {!selectedBook && (
//         <Table>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Title</th>
//               <th>Author</th>
//               <th>ISBN</th>
//               <th>Rate</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {borrowedBooks.content?.map((book, index) => (
//               <tr key={book.id}>
//                 <td>{index + 1}</td>
//                 <td>{book.title}</td>
//                 <td>{book.authorName}</td>
//                 <td>{book.isbn}</td>
//                 <td><i className="fas fa-star text-warning"></i> {book.rate}</td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <i className={book.returned ? 'fa-regular fa-paper-plane text-primary' : 'fa-solid fa-paper-plane text-success'} onClick={() => returnBorrowedBook(book as BorrowedBookResponse)}></i>
//                     <i className={book.returnApproved ? 'fa-solid fa-circle-check text-success' : 'fa-solid fa-circle-check'}></i>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}

//       {/* Pagination */}
//       <Pagination>
//         <Button onClick={goToFirstPage} disabled={page === 0}><i className="fa-solid fa-angles-left"></i></Button>
//         <Button onClick={goToPreviousPage} disabled={page === 0}><i className="fa-solid fa-angle-left"></i></Button>
//         {pages.map((pageIndex) => (
//           <Button key={pageIndex} onClick={() => goToPage(pageIndex)} className={page === pageIndex ? 'active' : ''}>
//             {pageIndex + 1}
//           </Button>
//         ))}
//         <Button onClick={goToNextPage} disabled={page === (borrowedBooks.totalPages || 0) - 1}><i className="fa-solid fa-chevron-right"></i></Button>
//         <Button onClick={goToLastPage} disabled={page === (borrowedBooks.totalPages || 0) - 1}><i className="fa-solid fa-angles-right"></i></Button>
//       </Pagination>
//     </Container>
//   );
// };

// export default BorrowedBookList;



// // 4th version
// import React, { useState, useEffect } from 'react';
// import { BookService, FeedbackService, PageResponseBorrowedBookResponse,BorrowedBookResponse, BookResponse,FeedbackRequest } from '../../../app/services/';
// import { BookServiceWrapper } from '../../../app/services/interceptor/BookServiceWrapper';
// // import { FeedbackService } from '../../../../services/services/feedback.service';
// // import { PageResponseBorrowedBookResponse } from '../../../../services/models/page-response-borrowed-book-response';
// // import { BorrowedBookResponse } from '../../../../services/models/borrowed-book-response';
// // import { BookResponse } from '../../../../services/models/book-response';
// // import { FeedbackRequest } from '../../../../services/models/feedback-request';
// import { StyledTable, StyledPagination, StyledForm, StyledButton, StyledLink } from './BorrowedBookList.styled';

// const BorrowedBookList: React.FC = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState<PageResponseBorrowedBookResponse>({});
//   const [selectedBook, setSelectedBook] = useState<BookResponse | undefined>(undefined);
//   const [feedbackRequest, setFeedbackRequest] = useState<FeedbackRequest>({ bookId: 0, comment: '', note: 0 });
//   const [page, setPage] = useState(0);
//   const [size] = useState(5);
//   const [pages, setPages] = useState<number[]>([]);

//   useEffect(() => {
//     findAllBorrowedBooks();
//   }, [page]);

//   const findAllBorrowedBooks = () => {
//     BookServiceWrapper.findAllBorrowedBooks(page, size ).then((resp) => {
//       setBorrowedBooks(resp);
//       setPages(Array(resp.totalPages).fill(0).map((x, i) => i));
//     });
//   };

//   const goToPage = (pageIndex: number) => {
//     setPage(pageIndex);
//   };

//   const goToFirstPage = () => {
//     setPage(0);
//   };

//   const goToPreviousPage = () => {
//     setPage((prevPage) => prevPage - 1);
//   };

//   const goToLastPage = () => setPage((borrowedBooks.totalPages ?? 0) - 1);
//   // () => {
//   //   setPage(borrowedBooks.totalPages - 1);
//   // };

//   const goToNextPage = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   const returnBorrowedBook = (book: BorrowedBookResponse) => {
//     setSelectedBook(book);
//     // setFeedbackRequest({ ...feedbackRequest, bookId: book.id });
//     setFeedbackRequest({ ...feedbackRequest, bookId: book.id ?? 0 });
//   };

//   const returnBook = (withFeedback: boolean) => {
//     if (selectedBook?.id) {
//             BookServiceWrapper.returnBorrowedBook(selectedBook.id)
//               .then(() => {
//                 if (withFeedback) {
//                   giveFeedback();
//                 }
//                 setSelectedBook(undefined);
//                 findAllBorrowedBooks();
//               })
//             }
//     // BookService.returnBorrowBook({ 'book-id': selectedBook?.id as number }).then(() => {
//     //   if (withFeedback) {
//     //     giveFeedback();
//     //   }
//     //   setSelectedBook(undefined);
//     //   findAllBorrowedBooks();
//     // });
//   };

//   // const giveFeedback = () => {
//   //   FeedbackService.saveFeedback({ body: feedbackRequest }).then(() => {});
//   // };

//   const giveFeedback = () => {
//     if (feedbackRequest.bookId && feedbackRequest.comment && (feedbackRequest.note||0) >= 0) {
//       FeedbackService.saveFeedback(feedbackRequest)
//         .then((response) => {
//           console.log('Feedback saved successfully with response code:', response);
//         })
//         .catch((error) => {
//           console.error('Error saving feedback:', error);
//         });
//     }
//   };

//   // const isLastPage = page === borrowedBooks.totalPages - 1;
//   const isLastPage = borrowedBooks && page === (borrowedBooks.totalPages || 0) - 1;

//   return (
//     <div>
//       <h2>My borrowed books</h2>
//       <hr />
//       {selectedBook ? (
//         <div className="d-flex flex-column col-6">
//           <h2>Return and share feedback</h2>
//           <div className="d-flex flex-column col-12">
//             <div className="d-flex">
//               <div className="col-1">
//                 <strong>Title</strong>
//               </div>
//               <div className="col-11">{selectedBook.title}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1">
//                 <strong>Author</strong>
//               </div>
//               <div className="col-11">{selectedBook.authorName}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1">
//                 <strong>ISBN</strong>
//               </div>
//               <div className="col-11">{selectedBook.isbn}</div>
//             </div>
//             <div className="d-flex">
//               <div className="col-1">
//                 <strong>Rate</strong>
//               </div>
//               <div className="col-11">{selectedBook.rate}</div>
//             </div>
//           </div>
//           <hr />
//           <StyledForm>
//             <div className="d-flex gap-3">
//               <input
//                 type="range"
//                 id="rate"
//                 name="rate"
//                 className="form-range w-25"
//                 min="0"
//                 max="5"
//                 step="0.5"
//                 value={feedbackRequest.note}
//                 onChange={(e) => setFeedbackRequest({ ...feedbackRequest, note: +e.target.value })}
//               />
//               <div className="rating">{feedbackRequest.note}</div>
//             </div>
//             <div className="col-12">
//               <label htmlFor="synopsis" className="form-label">
//                 Feedback
//               </label>
//               <textarea
//                 id="synopsis"
//                 name="synopsis"
//                 rows={4}
//                 className="form-control"
//                 value={feedbackRequest.comment}
//                 onChange={(e) => setFeedbackRequest({ ...feedbackRequest, comment: e.target.value })}
//                 placeholder="Feedback"
//               />
//             </div>
//             <div className="d-flex justify-content-end gap-2 col-12">
//               <StyledButton onClick={() => returnBook(true)}>
//                 <i className="fas fa-save"></i>&nbsp;Rate the book & Return
//               </StyledButton>
//               <StyledButton onClick={() => returnBook(false)}>
//                 <i className="fa-solid fa-paper-plane"></i>&nbsp;Just Return
//               </StyledButton>
//               <StyledLink href="/books/my-books">
//                 <i className="fas fa-times"></i>&nbsp;Cancel
//               </StyledLink>
//             </div>
//           </StyledForm>
//         </div>
//       ) : (
//         <div>
//           <StyledTable>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Title</th>
//                 <th>Author</th>
//                 <th>ISBN</th>
//                 <th>Rate</th>
//                 <th>
//                   <i className="fas fa-cogs"></i>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {borrowedBooks.content?.map((book, index) => (
//                 <tr key={book.id}>
//                   <td>{index + 1}</td>
//                   <td>{book.title}</td>
//                   <td>{book.authorName}</td>
//                   <td>{book.isbn}</td>
//                   <td>
//                     <i className="fas fa-star text-warning"></i> {book.rate}
//                   </td>
//                   <td>
//                     <div className="d-flex gap-2">
//                       {book.returned ? (
//                         <i className="fa-regular fa-paper-plane text-primary"></i>
//                       ) : (
//                         <i
//                           className="fa-solid fa-paper-plane text-success"
//                           onClick={() => returnBorrowedBook(book)}
//                         ></i>
//                       )}
//                       <i className={`fa-solid fa-circle-check ${book.returnApproved ? 'text-success' : ''}`}></i>
//                       {/* <i className={`fa-solid fa-circle-check ${book.returnApproved ? 'text-success' : ''}`}></i> */}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </StyledTable>
//           <StyledPagination>
//             <nav aria-label="Page navigation">
//               <ul className="pagination">
//                 <li className="page-item">
//                   <a
//                     className={`page-link ${page === 0 ? 'disabled' : ''}`}
//                     onClick={goToFirstPage}
//                     aria-label="Previous"
//                   >
//                     <i className="fa-solid fa-angles-left"></i>
//                   </a>
//                 </li>
//                 <li className="page-item">
//                   <a
//                     className={`page-link ${page === 0 ? 'disabled' : ''}`}
//                     onClick={goToPreviousPage}
//                     aria-label="Previous"
//                   >
//                     <i className="fa-solid fa-angle-left"></i>
//                   </a>
//                 </li>
//                 {pages.map((pageIndex) => (
//                   <li className="page-item" key={pageIndex}>
//                     <a
//                       className={`page-link ${page === pageIndex ? 'active' : ''}`}
//                       onClick={() => goToPage(pageIndex)}
//                     >
//                       {pageIndex + 1}
//                     </a>
//                   </li>
//                 ))}
//                 <li className="page-item">
//                   <a
//                     className={`page-link ${isLastPage ? 'disabled' : ''}`}
//                     onClick={goToNextPage}
//                     aria-label="Next"
//                   >
//                     <i className="fa-solid fa-chevron-right"></i>
//                   </a>
//                 </li>
//                 <li className="page-item">
//                   <a
//                     className={`page-link ${isLastPage ? 'disabled' : ''}`}
//                     onClick={goToLastPage}
//                     aria-label="Next"
//                   >
//                     <i className="fa-solid fa-angles-right"></i>
//                   </a>
//                 </li>
//               </ul>
//             </nav>
//           </StyledPagination>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BorrowedBookList;



// 5th version

import React, { useState, useEffect } from 'react';
import { BookService, FeedbackService, PageResponseBorrowedBookResponse,BorrowedBookResponse, BookResponse,FeedbackRequest } from '../../../app/services/';
import { BookServiceWrapper } from '../../../app/services/interceptor/BookServiceWrapper';
import { FeedbackServiceWrapper } from '../../../app/services/interceptor/FeedbackServiceWrapper';
import {
  StyledTable,
  StyledPagination,
  StyledForm,
  StyledButton,
  StyledLink,
  StyledFeedbackNote,
  StyledRating,
  StyledRangeInput,
  StyledContainer,
  StyledBookInfo,
  StyledBookRow,
  StyledBookLabel,
  StyledBookDetail,
  StyledFormGroup,
  StyledRatingStar,
} from './BorrowedBookList.styled';

const BorrowedBookList: React.FC = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<PageResponseBorrowedBookResponse>({});
  const [selectedBook, setSelectedBook] = useState<BookResponse | undefined>(undefined);
  const [feedbackRequest, setFeedbackRequest] = useState<FeedbackRequest>({ bookId: 0, comment: '', note: 0 });
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    findAllBorrowedBooks();
  }, [page]);

  const findAllBorrowedBooks = () => {
    BookServiceWrapper.findAllBorrowedBooks( page, size ).then((resp) => {
      setBorrowedBooks(resp);
      setPages(Array(resp.totalPages).fill(0).map((x, i) => i));
    });
  };

  const goToPage = (pageIndex: number) => {
    setPage(pageIndex);
  };

  const goToFirstPage = () => {
    setPage(0);
  };

  const goToPreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const goToLastPage = () => setPage((borrowedBooks.totalPages ?? 0) - 1);

  const goToNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const returnBorrowedBook = (book: BorrowedBookResponse) => {
    setSelectedBook(book);
    setFeedbackRequest({ ...feedbackRequest, bookId: book.id ?? 0});
  };

  const returnBook = (withFeedback: boolean) => {
    console.log("returnBook is called", selectedBook?.id)
    if (selectedBook?.id) {
      BookServiceWrapper.returnBorrowedBook(selectedBook.id)
        .then(() => {
          if (withFeedback) {
            giveFeedback();
          }
          setSelectedBook(undefined);
          findAllBorrowedBooks();
        })
        .catch((error) => {
          console.error("Error returning borrowed book:", error);
          // Optional: Show an error message to the user
        });
    }
  };

  const giveFeedback = () => {
    console.log("giveFeedback called", feedbackRequest.bookId, feedbackRequest.comment, feedbackRequest.note)
    if (feedbackRequest.bookId && feedbackRequest.comment && feedbackRequest.note||0 >= 0) {
      FeedbackServiceWrapper.saveFeedback(feedbackRequest)
        .then((response) => {
          console.log('Feedback saved successfully with response code:', response);
        })
        .catch((error) => {
          console.error('Error saving feedback:', error);
        });
    }
  };

  const isLastPage = borrowedBooks && page === (borrowedBooks.totalPages||0) - 1;

  return (
    <StyledContainer>
      <h2>My borrowed books</h2>
      <hr />
      {selectedBook ? (
        <div className="d-flex flex-column col-6">
          <h2>Return and share feedback</h2>
          <StyledBookInfo>
            <StyledBookRow>
              <StyledBookLabel>Title</StyledBookLabel>
              <StyledBookDetail>{selectedBook.title}</StyledBookDetail>
            </StyledBookRow>
            <StyledBookRow>
              <StyledBookLabel>Author</StyledBookLabel>
              <StyledBookDetail>{selectedBook.authorName}</StyledBookDetail>
            </StyledBookRow>
            <StyledBookRow>
              <StyledBookLabel>ISBN</StyledBookLabel>
              <StyledBookDetail>{selectedBook.isbn}</StyledBookDetail>
            </StyledBookRow>
            <StyledBookRow>
              <StyledBookLabel>Rate</StyledBookLabel>
              <StyledBookDetail>{selectedBook.rate}</StyledBookDetail>
            </StyledBookRow>
          </StyledBookInfo>
          <hr />
          <StyledForm>
            <StyledFormGroup>
              <label htmlFor="rate" className="form-label">
                Rate the Book
              </label>
              <div className="d-flex gap-3">
                <StyledRangeInput
                  type="range"
                  id="rate"
                  name="rate"
                  min="0"
                  max="5"
                  step="0.5"
                  value={feedbackRequest.note}
                  onChange={(e) => setFeedbackRequest({ ...feedbackRequest, note: +e.target.value })}
                />
                <StyledFeedbackNote>{feedbackRequest.note}</StyledFeedbackNote>
              </div>
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="synopsis" className="form-label">
                Feedback
              </label>
              <textarea
                id="synopsis"
                name="synopsis"
                rows={4}
                className="form-control"
                value={feedbackRequest.comment}
                onChange={(e) => setFeedbackRequest({ ...feedbackRequest, comment: e.target.value })}
                placeholder="Your feedback here"
              />
            </StyledFormGroup>
            <div className="d-flex justify-content-end gap-2 col-12">
              <StyledButton onClick={() => returnBook(true)}>
                <i className="fas fa-save"></i>&nbsp;Rate the book & Return
              </StyledButton>
              <StyledButton onClick={() => returnBook(false)}>
                <i className="fa-solid fa-paper-plane"></i>&nbsp;Just Return
              </StyledButton>
              <StyledLink href="/books/my-books">
                <i className="fas fa-times"></i>&nbsp;Cancel
              </StyledLink>
            </div>
          </StyledForm>
        </div>
      ) : (
        <div>
          <StyledTable>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Rate</th>
                <th>
                  <i className="fas fa-cogs"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.content?.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.authorName}</td>
                  <td>{book.isbn}</td>
                  <td>
                    <StyledRatingStar className="fas fa-star text-warning" />
                    {book.rate}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <i
                        className={book.returned ? 'fa-regular fa-paper-plane text-primary' : 'fa-solid fa-paper-plane text-success'}
                        onClick={() => !book.returned && returnBorrowedBook(book)}
                      ></i>
                      <i className={`fa-solid fa-circle-check ${book.returnApproved ? 'text-success' : ''}`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
          <StyledPagination>
            <ul className="pagination">
              <li className="page-item">
                <a
                  className={`page-link ${page === 0 ? 'disabled' : ''}`}
                  onClick={goToFirstPage}
                  aria-label="Previous"
                >
                  <i className="fa-solid fa-angles-left"></i>
                </a>
              </li>
              <li className="page-item">
                <a
                  className={`page-link ${page === 0 ? 'disabled' : ''}`}
                  onClick={goToPreviousPage}
                  aria-label="Previous"
                >
                  <i className="fa-solid fa-angle-left"></i>
                </a>
              </li>
              {pages.map((pageIndex) => (
                <li key={pageIndex} className="page-item">
                  <a
                    className={`page-link ${page === pageIndex ? 'active' : ''}`}
                    onClick={() => goToPage(pageIndex)}
                  >
                    {pageIndex + 1}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a
                  className={`page-link ${isLastPage ? 'disabled' : ''}`}
                  onClick={goToNextPage}
                  aria-label="Next"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
              <li className="page-item">
                <a
                  className={`page-link ${isLastPage ? 'disabled' : ''}`}
                  onClick={goToLastPage}
                  aria-label="Next"
                >
                  <i className="fa-solid fa-angles-right"></i>
                </a>
              </li>
            </ul>
          </StyledPagination>
        </div>
      )}
    </StyledContainer>
  );
};

export default BorrowedBookList;
