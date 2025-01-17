import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageBook from './ManageBook';

describe('<ManageBook />', () => {
  test('it should mount', () => {
    render(<ManageBook />);

    const manageBook = screen.getByTestId('ManageBook');

    expect(manageBook).toBeInTheDocument();
  });
});