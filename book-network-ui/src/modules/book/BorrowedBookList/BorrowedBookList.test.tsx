import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BorrowedBookList from './BorrowedBookList';

describe('<BorrowedBookList />', () => {
  test('it should mount', () => {
    render(<BorrowedBookList />);

    const borrowedBookList = screen.getByTestId('BorrowedBookList');

    expect(borrowedBookList).toBeInTheDocument();
  });
});