import axios from 'axios';
import { CancelablePromise, PageResponseBookResponse, OpenAPI, BookRequest, BookResponse, PageResponseBorrowedBookResponse, FeedbackRequest, PageResponseFeedbackResponse } from '..';
import interceptorInstance from './interceptor';

export class FeedbackServiceWrapper {

    public static async saveFeedback(requestBody?: FeedbackRequest): Promise<number> {
        try {
          const response = await interceptorInstance.post('/feedbacks', requestBody, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          return response.data;  // Return the feedback ID
        } catch (error) {
          console.error('Error saving feedback:', error);
          throw error;  // Re-throw the error so the caller can handle it
        }
      }

      public static async findAllFeedbackByBook(
        bookId: number,
        page?: number,
        size: number = 10
      ): Promise<PageResponseFeedbackResponse> {
        try {
          // Replace {book-id} with the actual bookId value in the URL
          const response = await interceptorInstance.get(`/feedbacks/book/${bookId}`, {
            params: {
              page,  // Send page as a query parameter
              size,  // Send size as a query parameter
            },
          });
      
          return response.data;  // Return the feedbacks for the book
        } catch (error) {
          console.error('Error fetching feedback for book:', error);
          throw error;  // Re-throw the error so the caller can handle it
        }
      }

}