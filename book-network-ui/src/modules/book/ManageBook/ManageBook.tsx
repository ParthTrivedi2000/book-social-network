import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookService,BookRequest } from '../../../app/services';
import { Wrapper, FormContainer, CoverSection, Form, FormSection } from './ManageBook.styled';
import { BookServiceWrapper } from '../../../app/services/interceptor/BookServiceWrapper';

const ManageBook: React.FC = () => {
   const { bookId } = useParams<{ bookId: string }>(); // Get bookId from URL params
   const navigate = useNavigate(); // Use navigate for React Router v6
 
   // Ensure that all properties are initialized with strings or booleans (empty string for text, false for booleans)
  const [bookRequest, setBookRequest] = useState<BookRequest>({
   authorName: '',
   isbn: '',
   synopsis: '',
   title: '', // Initialize title as empty string
   shareable: false, // Initialize as false if it's a checkbox
 });

 const [selectedBookCover, setSelectedBookCover] = useState<File | null>(null);
 const [selectedPicture, setSelectedPicture] = useState<string | undefined>(undefined);
 const [errorMsg, setErrorMsg] = useState<string[]>([]);

 // Fetch book data when the component mounts or when bookId changes
 useEffect(() => {
   if (bookId) {
    //  BookService.findById(Number(bookId)) // Convert bookId to number
    BookServiceWrapper.findById(Number(bookId)) // Convert bookId to number
       .then((book) => {
         setBookRequest({
           id: book.id,
           title: book.title || '', // Ensure title is always a string (use empty string as fallback)
           authorName: book.authorName || '',
           isbn: book.isbn || '',
           synopsis: book.synopsis || '',
           shareable: book.shareable || false, // Ensure shareable is a boolean
         });
       })
       .catch((err) => {
         setErrorMsg([err.message || 'Failed to fetch book details']);
       });
   }
 }, [bookId]);

 const saveBook = () => {
  //  BookService.saveBook(bookRequest)
   BookServiceWrapper.saveBook(bookRequest)
     .then((bookId) => {
       // Ensure that the `bookId` is passed correctly and selectedBookCover is not null
       if (selectedBookCover) {
        //  BookService.uploadBookCoverPicture(bookId, { file: selectedBookCover }) // Pass bookId and file separately
         BookServiceWrapper.uploadBookCoverPicture(bookId, { file: selectedBookCover }) // Pass bookId and file separately
           .then(() => {
             navigate('/books/my-books');
           })
           .catch((err) => {
             setErrorMsg([err.message || 'Failed to upload book cover']);
           });
       } else {
         navigate('/books/my-books');
       }
     })
     .catch((err) => {
       console.log(err);
       setErrorMsg([err.message || 'Failed to save book']);
     });
 };

 const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
   const file = event.target.files?.[0];
   if (file) {
     setSelectedBookCover(file);
     const reader = new FileReader();
     reader.onload = () => {
       setSelectedPicture(reader.result as string);
     };
     reader.readAsDataURL(file);
   }
 };

 return (
   <Wrapper>
     <h2>Manage my book</h2>
     <hr />
     {/* Display error message */}
     {errorMsg.length > 0 && (
       <div className="alert alert-danger mt-2" role="alert">
         {errorMsg.map((msg, idx) => (
           <p key={idx} className="p-0 m-0">
             {msg}
           </p>
         ))}
       </div>
     )}
     <FormContainer>
       <CoverSection>
         <img
           className="rounded-1"
           width="100%"
           height="100%"
           src={selectedPicture || 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f'}
           alt="Book Cover"
         />
         <div className="mt-2">
           <input
             className="form-control"
             type="file"
             id="formFile"
             accept="image/*"
             onChange={onFileSelected}
           />
         </div>
       </CoverSection>
       <FormSection>
         <Form>
           <div className="col-12">
             <label htmlFor="title" className="form-label">
               Title
             </label>
             <input
               value={bookRequest.title}
               onChange={(e) => setBookRequest({ ...bookRequest, title: e.target.value })}
               type="text"
               className="form-control"
               id="title"
               placeholder="Book title"
             />
           </div>
           <div className="col-md-6">
             <label htmlFor="author" className="form-label">
               Author name
             </label>
             <input
               value={bookRequest.authorName}
               onChange={(e) => setBookRequest({ ...bookRequest, authorName: e.target.value })}
               type="text"
               className="form-control"
               id="author"
               placeholder="Author name"
             />
           </div>
           <div className="col-md-6">
             <label htmlFor="isbn" className="form-label">
               ISBN
             </label>
             <input
               value={bookRequest.isbn}
               onChange={(e) => setBookRequest({ ...bookRequest, isbn: e.target.value })}
               type="text"
               className="form-control"
               id="isbn"
             />
           </div>
           <div className="col-12">
             <label htmlFor="synopsis" className="form-label">
               Synopsis
             </label>
             <textarea
               value={bookRequest.synopsis}
               onChange={(e) => setBookRequest({ ...bookRequest, synopsis: e.target.value })}
               rows={4}
               className="form-control"
               id="synopsis"
               placeholder="Enter synopsis"
             />
           </div>
           <div className="col-12">
             <div className="form-check">
               <input
                 checked={bookRequest.shareable || false}
                 onChange={(e) => setBookRequest({ ...bookRequest, shareable: e.target.checked })}
                 className="form-check-input"
                 type="checkbox"
                 id="gridCheck"
               />
               <label className="form-check-label" htmlFor="gridCheck">
                 Share me
               </label>
             </div>
           </div>
           <div className="d-flex justify-content-end gap-2 col-12">
             <button onClick={saveBook} type="button" className="btn btn-outline-primary">
               <i className="fas fa-save"></i>&nbsp;Save
             </button>
             <button
               type="button"
               className="btn btn-link btn text-danger"
               onClick={() => navigate('/books/my-books')}
             >
               <i className="fas fa-times"></i>&nbsp;Cancel
             </button>
           </div>
         </Form>
       </FormSection>
     </FormContainer>
   </Wrapper>
 );
};

export default ManageBook;
