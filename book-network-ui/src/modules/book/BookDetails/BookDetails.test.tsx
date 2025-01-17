import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookDetails from './BookDetails';

describe('<BookDetails />', () => {
  test('it should mount', () => {
    render(<BookDetails />);

    const bookDetails = screen.getByTestId('BookDetails');

    expect(bookDetails).toBeInTheDocument();
  });
});