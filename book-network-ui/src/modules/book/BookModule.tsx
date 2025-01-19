import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your pre-created components
import Main from './Main/Main';
import BookList from './BookList/BookList';
import MyBooks from './MyBooks/MyBooks';
import BorrowedBookList from './BorrowedBookList/BorrowedBookList';
import ReturnedBooks from './ReturnedBooks/ReturnedBooks';
import BookDetails from './BookDetails/BookDetails';
import ManageBook from './ManageBook/ManageBook';

// Importing AuthGuard component for route protection
import AuthGuard from '../../app/services/guard/AuthGuard';

const BookModule: React.FC = () => {
  return (
    <Routes>
      {/* The main route for BookModule */}
      <Route path="/" element={<Main />}>
        {/* Protected routes wrapped inside AuthGuard */}
        {/* <Route element={<AuthGuard children={undefined}/>}> */}
          <Route path="/" element={<BookList />} />
          <Route path="my-books" element={<MyBooks />} />
          <Route path="my-borrowed-books" element={<BorrowedBookList />} />
          <Route path="my-returned-books" element={<ReturnedBooks />} />
          <Route path="details/:bookId" element={<BookDetails />} />
          <Route path="manage" element={<ManageBook />} />
          <Route path="manage/:bookId" element={<ManageBook />} />
        {/* </Route> */}
      </Route>
    </Routes>
  );
};

export default BookModule;