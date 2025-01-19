import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReturnedBooks from './ReturnedBooks';

describe('<ReturnedBooks />', () => {
  test('it should mount', () => {
    render(<ReturnedBooks />);

    const returnedBooks = screen.getByTestId('ReturnedBooks');

    expect(returnedBooks).toBeInTheDocument();
  });
});