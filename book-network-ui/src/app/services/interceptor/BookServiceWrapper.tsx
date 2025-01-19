// BookServiceWrapper.ts
// import { BookService } from './BookService';
// import BookService from '../../../app/services';
// import axiosInstance from './axiosInstance';  // The custom Axios instance with interceptors
import axios from 'axios';
import { CancelablePromise, PageResponseBookResponse, OpenAPI, BookRequest, BookResponse, PageResponseBorrowedBookResponse } from '..';
import interceptorInstance from './interceptor';

export class BookServiceWrapper {
  public static async findAllBooks(
    page?: number,
    size: number = 10
  ): Promise<PageResponseBookResponse> {
    try {
      // Make the GET request with interceptorInstance
      const response = await interceptorInstance.get('/books', {
        params: {
          page,  // Send page as a query parameter
          size,  // Send size as a query parameter
        },
      });

      // Return the response data containing the books
      return response.data; // Assuming response.data contains the list of books
    } catch (error) {
      console.error('Error fetching all books:', error);
      throw error; // Re-throw the error so the caller can handle it
    }
  }

  public static async findAllBooksByOwner(
    page?: number,
    size: number = 10
  ): Promise<PageResponseBookResponse> {
    try {
      // Make the GET request with interceptorInstance
      const response = await interceptorInstance.get('/books/owner', {
        params: {
          page,  // Send page as a query parameter
          size,  // Send size as a query parameter
        },
      });

      // Return the response data containing books
      return response.data; // Assuming response.data contains the list of books
    } catch (error) {
      console.error('Error fetching books by owner:', error);
      throw error; // Re-throw the error so the caller can handle it
    }
  }

  public static async saveBook(requestBody: BookRequest): Promise<number> {
    try {
      const response = await interceptorInstance.post('/books', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;  // The response should contain the book ID
    } catch (error) {
      throw error;  // Handle or rethrow the error as needed
    }
  }


  public static async uploadBookCoverPicture(
    bookId: number,
    formData?: { file: Blob }
  ): Promise<any> {
    try {
      const response = await interceptorInstance.post(`/books/cover/${bookId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;  // Return the response data (or modify if needed)
    } catch (error) {
      throw error;  // Handle or rethrow the error
    }
  }

  // Add all other methods here by wrapping the BookService methods

  // Borrow a book
  public static async borrowBook(bookId: number): Promise<number> {
    try {
      const response = await interceptorInstance.post(`/books/borrow/${bookId}`);
      return response.data;  // Assuming the response contains the status or ID
    } catch (error) {
      console.error('Error borrowing book:', error);
    
    // Rethrow the error with more context (casting to AxiosError)
    if (axios.isAxiosError(error)) {
      // If it's an AxiosError, you can access the response and data
      throw error;  // Rethrow as it is, it has the response structure
    } else {
      // Otherwise, create a generic error with additional context
      const customError = new Error('An unexpected error occurred while borrowing the book');
      throw customError;
    }
  }
}

  // Update the shareable status of a book
  public static async updateShareableStatus(bookId: number): Promise<number> {
    try {
      const response = await interceptorInstance.patch(`/books/shareable/${bookId}`);
      return response.data;  // Assuming the response contains the updated status
    } catch (error) {
      console.error('Error updating shareable status:', error);
      throw error;
    }
  }

  // Return a borrowed book
  public static async returnBorrowedBook(bookId: number): Promise<number> {
    try {
      const response = await interceptorInstance.patch(`/books/borrow/return/${bookId}`);
      return response.data;  // Assuming the response contains the return status
    } catch (error) {
      console.error('Error returning borrowed book:', error);
      throw error;
    }
  }

  // Approve the return of a borrowed book
  public static async approveReturnBorrowedBook(bookId: number): Promise<number> {
    try {
      const response = await interceptorInstance.patch(`/books/borrow/return/approve/${bookId}`);
      return response.data;  // Assuming the response contains the approval status
    } catch (error) {
      console.error('Error approving return of borrowed book:', error);
      throw error;
    }
  }

  // Update the archived status of a book
  public static async updateArchivedStatus(bookId: number): Promise<number> {
    try {
      const response = await interceptorInstance.patch(`/books/archived/${bookId}`);
      return response.data;  // Assuming the response contains the updated archived status
    } catch (error) {
      console.error('Error updating archived status:', error);
      throw error;
    }
  }

  // Find a book by ID
  public static async findById(bookId: number): Promise<BookResponse> {
    try {
      const response = await interceptorInstance.get(`/books/${bookId}`);
      return response.data;  // Assuming the response contains the book data
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      throw error;
    }
  }

  // Find all returned books
  public static async findAllReturnedBooks(
    page?: number,
    size: number = 10
  ): Promise<PageResponseBorrowedBookResponse> {
    try {
      const response = await interceptorInstance.get('/books/returned', {
        params: {
          page,  // Send page as a query parameter
          size,  // Send size as a query parameter
        },
      });
      return response.data;  // Assuming response.data contains the returned books
    } catch (error) {
      console.error('Error fetching all returned books:', error);
      throw error;
    }
  }

  // Find all borrowed books
  public static async findAllBorrowedBooks(
    page?: number,
    size: number = 10
  ): Promise<PageResponseBorrowedBookResponse> {
    try {
      const response = await interceptorInstance.get('/books/borrowed', {
        params: {
          page,  // Send page as a query parameter
          size,  // Send size as a query parameter
        },
      });
      return response.data;  // Assuming response.data contains the borrowed books
    } catch (error) {
      console.error('Error fetching all borrowed books:', error);
      throw error;
    }
  }
}