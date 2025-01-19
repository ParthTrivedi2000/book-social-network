import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyBooks from './MyBooks';

describe('<MyBooks />', () => {
  test('it should mount', () => {
    render(<MyBooks />);

    const myBooks = screen.getByTestId('MyBooks');

    expect(myBooks).toBeInTheDocument();
  });
});