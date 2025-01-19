import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookList from './BookList';

describe('<BookList />', () => {
  test('it should mount', () => {
    render(<BookList />);

    const bookList = screen.getByTestId('BookList');

    expect(bookList).toBeInTheDocument();
  });
});