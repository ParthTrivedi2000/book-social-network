import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookCard from './BookCard';
import { BookResponse } from '../../../app/services';

describe('<BookCard />', () => {
  test('it should mount', () => {
    render(<BookCard book={{
      id: undefined,
      title: undefined,
      authorName: undefined,
      isbn: undefined,
      synopsis: undefined,
      owner: undefined,
      cover: undefined,
      rate: undefined,
      archived: undefined,
      shareable: undefined
    }} manage={false} onShare={()=>{}} onArchive={()=>{}} onRate={()=>{}} onAddToWaitingList={function (book: BookResponse): void {
      throw new Error('Function not implemented.');
    } } onBorrow={function (book: BookResponse): void {
      throw new Error('Function not implemented.');
    } } onEdit={function (book: BookResponse): void {
      throw new Error('Function not implemented.');
    } } onShowDetails={function (book: BookResponse): void {
      throw new Error('Function not implemented.');
    } }  />);

    const bookCard = screen.getByTestId('BookCard');

    expect(bookCard).toBeInTheDocument();
  });
});