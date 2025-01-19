# Book Social Network - Backend

## **Book Social Network API Overview**

Welcome to the **Book Social Network Backend**! This repository is the backend service for a social network where book enthusiasts can connect, share book reviews, manage their virtual libraries, and borrow books from others. It is built using **Spring Boot**, **Spring JPA**, **Lombok**, **Spring Security**, and **Swagger UI**, following the **MVC architecture**. This project provides a robust foundation for managing users, books, feedback, and interactions.
The backend of the Book Social Network project is responsible for handling all server-side operations, including user authentication, book management, and API endpoints. This section provides an overview of the backend architecture, technologies used, and setup instructions.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Resources](#resources)

## **Brief Overview:**
- User Authentication and Authorization
- Book Management
- Feedback Management
- Book History Management
- Security and Exception Handling
- Database

  
## **Key Features**

### 1. **User Authentication and Authorization**:
   - User registration and login functionalities implemented.  
   - Backend authentication secured with **Spring Security**. 
   - **JWT Authentication**: JWT (JSON Web Token) integration for secure communication between the backend and frontend. The API uses JSON Web Tokens (JWT) for secure, stateless authentication to protect resources and endpoints. Tokens have expiration for enhanced security.
   - **Email Verification**: Adds an extra layer of security with account activation through email verification. Sends a verification email after user registration to confirm the email address.
   - Ensures that all user actions are authenticated and authorized.
   - Example API Paths:
     - **Register User**: `POST https://localhost:8080/api/v1/auth/register`
     - **Authenticate User**: `POST https://localhost:8080/api/v1/auth/authenticate`
     - **Activate Account**: `GET https://localhost:8080/auth/api/v1/activate-account?token={token}`

### 2. **Book Management**:
   - **CRUD Operations**: Manage books with functionalities to create, update, delete, and retrieve books for both the frontend and backend.
   - **Archiving and Publishing**: Users can archive books they no longer wish to share but want to keep a record of or it can be published.
   - **Book Sharing**  
    - Users can mark books as available for sharing.  
    - View a list of all available books.  
    - Share a book with another user using the sharing functionality.  
   - **Book Borrowing**  
    - Borrow and return books with a robust tracking system.  
    - Track the status of books: **borrowed**, **archived**, or **available**.  
    - Prevent multiple users from borrowing the same book simultaneously.  
   - **Two-Way Book Return Policy**  
    - Handles book lending with agreements between lender and owner.
    - Users can return borrowed books.
    - The return process includes an approval step to confirm the book's condition.
    - Book owners can approve book returns, ensuring proper management of the borrowing system.
   - **Book Cover Management**: Allows uploading and updating of book cover images.
   - **Pagination**: Lists of books are paginated for better performance.
   - Example API Paths:
     - **Create Book**: `POST https://localhost:8080/api/v1/books`
     - **Get All Books**: `GET https://localhost:8080/api/v1/books`
     - **Get books owned by a user**: `GET https://localhost:8080/api/v1/books/owner`
     - **Get Book by ID**: `GET https://localhost:8080/api/v1/books/{book-id}`
     - **Get Books Borrowed by the User**: `GET https://localhost:8080/api/v1/books/borrowed`
     - **Get Books Returned by the User**: `GET https://localhost:8080/api/v1/books/returned`
     - **Borrow a Book**: `POST https://localhost:8080/api/v1/books/borrow/{book-id}`
     - **Archive a Book**: `PATCH https://localhost:8080/api/v1/books/archive/{book-id}`
     - **Update Shareable Status**: `PATCH https://localhost:8080/api/v1/books/shareable/{book-id}`
     - **Return Borrowed Book**: `PATCH https://localhost:8080/api/v1/books/borrow/return/{book-id}`
     - **Approve a Returned Book**: `PATCH https://localhost:8080/api/v1/books/borrow/return/approve/{book-id}`
     - **Upload Book Cover**: `POST https://localhost:8080/api/v1/books/cover/{book-id}`  

### 3. **Feedback Management**:
   - **CRUD Operations**: Users can provide feedback on books, with pagination support.
   - Users can leave feedback on books if:  
    - The book is **shareable** and **not archived**.  
    - The user does **not own** the book.  
   - Receive feedback for specific books.
   - Feedbacks help others discover great books and share their opinions.
   - Example API Paths:
     - **Add feedback for a book**: `POST https://localhost:8080/api/v1/feedbacks`
     - **Get feedback for a specific book**: `GET https://localhost:8080/api/v1/feedbacks/book/{bookId}`

### 4. **Book History Management**:
   - **Track User and Book History**: Keep detailed records of book transactions and user interactions.

### 5. **Security and Exception Handling**:
   - **Custom Exceptions**: Implement custom exception handling for various error scenarios.
   - **Exception Handlers**: Manage exceptions gracefully across the application.
   - **Filter for Unauthenticated Access**: Registration and authentication endpoints are accessible without JWT verification.

### 6. **REST API Best Practices**
   - The application adheres to REST API best practices.
   - Clear and consistent API endpoints for smooth integration and usage.
   - Swagger Documentation:- Provides comprehensive API documentation using Swagger, allowing users to explore and test the API endpoints.

## **Technologies Used**

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![openapi initiative](https://img.shields.io/badge/openapiinitiative-%23000000.svg?style=for-the-badge&logo=openapiinitiative&logoColor=white)


- **Backend Framework**: Spring Boot
- **Data Persistence**: Spring JPA (Java Persistence API)
- **Security**: Spring Security with JWT for authentication and email verification for account activation
- **Database**: PostgreSQL
- **Utilities**: Lombok for reducing boilerplate code
- **Documentation**: Swagger UI for API documentation
- **Architecture**: MVC (Model-View-Controller)
- **File Handling**: Multipart file handling for book cover uploads


## **Project Structure**
The project follows a standard Java Spring Boot structure(Modern Driven Architecture). Key components include:

### Main Application
- **`BookSocialNetworkApplication.java`**: The entry point of the application.

### Authentication Module
- **Controllers**
  - `AuthController.java`: Handles authentication-related requests.
- **DTOs**
  - `LoginRequest.java`: For user login data.
  - `LoginResponse.java`: For login responses.
  - `RegisterRequest.java`: For user registration data.
  - `VerifyRequest.java`: For account verification.
- **Services**
  - `ResentVerificationEmailService.java`: Resends verification emails.
  - `UserActivationService.java`: Manages user account activation.
  - `UserLoginService.java`: Handles user login logic.
  - `UserRegisterService.java`: Manages user registration logic.

### Book Module
- **Controllers**
  - `BookController.java`: Handles authentication-related requests.
- **DTOs**
  - `BookMapper.java`: For map the book with its dto (BookResponse and BorrowedBookResponse)
  - `BookRequest.java`: For retured Book data
  - `BookResponse.java`: For accespt book data.
  - `BorrowedBookResponse.java`: For retured BorrowedBook data.
- **Services**
  - `FindAllBooksByOwnerService.java`
  - `FindAllDisplayableBookService.java`
  - `FindBookByIdService.java`
  - `GetAllBorrowedBookService.java`
  - `SaveBook.java`


## Getting Started

### Prerequisites

- Java 17 or later
- Maven 3.8.1 or later
- PostgreSQL 12 or later


## Setup Instructions
To set up the backend of the Book Social Network project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ParthTrivedi2000/book-social-network.git
    ```
2. Navigate to the project directory:
   ```bash
   cd book-social-network
   ```
3. Update the environment variables in the application.yml file with your database and email configurations:

    ```yaml
    spring:
    datasource:
        url: jdbc:postgresql://db:5432/book_db
        username: your_db_username
        password: your_db_password

    mail:
        host: localhost
        port: 1025
        username: username
        password: password
        properties:
        mail:
            smtp:
            trust: '*'
            auth: true
            starttls:
            enable: true
            connectiontimeout: 5000
            timeout: 3000
            writetimeout: 5000
    ```

4. Run the application using Docker Compose:

    ```bash
    docker-compose up --build
    ```

5. Build the project
    ```bash
    mvn clean install
    ```

6. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   or
   ```bash
   java -jar target/book-network-0.0.1.jar
   ```

7. The application uses Springdoc OpenAPI for API documentation. Once the application is running, you can access the API documentation at below endpoint.

    Open a web browser and go to `http://localhost:8088/api/v1/swagger-ui/index.html`

8. Access MailDev to receive emails (token receiving):  

    Open a web browser and go to `http://localhost:1080/#/`

## **API Endpoints**

### **User Authentication**

1. **Register User**
   - **Method**: `POST`  
   - **URL**: `http://localhost:8080/api/v1/auth/register`  
   - **Request Body**:
     ```json
     {
       "firstname": "parth",
       "lastname": "trivedi",
       "email": "abcd@gmail.com",
       "password": "Password@123"
     }
     ```
   - **Response**: `202 Accepted`

2. **Activate Account**
   - **Method**: `GET`  
   - **URL**: `http://localhost:8080/api/v1/auth/activate-account?token=<activation_token>`  
   - **Response**: `200 OK`

3. **Login User**
   - **Method**: `POST`  
   - **URL**: `http://localhost:8080/api/v1/auth/authenticate`  
   - **Request Body**:
     ```json
     {
       "email": "abcd@gmail.com",
       "password": "Password@123"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "<JWT_access_token>"
     }
     ```
     - **Success Code**: `200 OK`

---

### **Book Management**

## Authorization
All endpoints require a JWT token.  
Include the following header in all requests:
```http
Authorization: Bearer <JWT_access_token>
```
---

## Endpoints

### 1. **Save Book**
- **Method**: `POST`  
- **URL**: `http://localhost:8088/books`  
- **Request Body**:  
  ```json
  {
    "title": "Java Spring Boot Book",
    "authorName": "James Gosling",
    "isbn": "4512",
    "synopsis": "Book about Java programming",
    "shareable": true
  }
  ```
- **Response Body**:  
  ```json
  {
    "id": 58
  }
  ```
- **Success Code**: `200 OK`

---

### 2. **Find Book by ID**
- **Method**: `GET`  
- **URL**: `http://localhost:8088/books/{book-id}`  
- **Response Body**:  
  ```json
  {
    "id": 58,
    "title": "Java Spring Boot Book",
    "authorName": "James Gosling",
    "isbn": "4512",
    "synopsis": "Book about Java programming",
    "rate": 4.5,
    "bookCover": "http://example.com/cover.jpg",
    "shareable": true,
    "archived": false
  }
  ```
- **Success Code**: `200 OK`

---

### 3. **Find All Books**
- **Method**: `GET`  
- **URL**: `http://localhost:8088/books`  
- **Query Params**:  
  - `page`: Page number (default: `0`)  
  - `size`: Number of items per page (default: `10`)  
- **Response Body**:  
  ```json
  {
    "content": [
      {
        "id": 58,
        "title": "Java Spring Boot Book",
        "authorName": "James Gosling",
        "rate": 4.5
      }
    ],
    "number": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "first": true,
    "last": true
  }
  ```
- **Success Code**: `200 OK`

---

### 4. **Find Owner's Books**
- **Method**: `GET`  
- **URL**: `http://localhost:8088/books/owner`  
- **Query Params**: Same as Find All Books  
- **Response Body**:  
  ```json
  {
    "content": [
      {
        "id": 58,
        "title": "Java Spring Boot Book",
        "authorName": "James Gosling",
        "rate": 4.5
      }
    ],
    "number": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "first": true,
    "last": true
  }
  ```
- **Success Code**: `200 OK`

---

### 5. **Find Borrowed Books**
- **Method**: `GET`  
- **URL**: `http://localhost:8088/books/borrowed`  
- **Query Params**: Same as Find All Books  
- **Response Body**:  
  ```json
  {
    "content": [
      {
        "bookId": 58,
        "title": "Java Spring Boot Book",
        "authorName": "James Gosling",
        "isbn": "4512",
        "borrowed": true,
        "returned": false,
        "returnApproved": false
      }
    ],
    "number": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "first": true,
    "last": true
  }
  ```
- **Success Code**: `200 OK`

---

### 6. **Find Returned Books**
- **Method**: `GET`  
- **URL**: `http://localhost:8088/books/returned`  
- **Query Params**: Same as Find All Books  
- **Response Body**:  
  ```json
  {
    "content": [
      {
        "bookId": 58,
        "title": "Java Spring Boot Book",
        "authorName": "James Gosling",
        "isbn": "4512",
        "borrowed": false,
        "returned": true,
        "returnApproved": true
      }
    ],
    "number": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "first": true,
    "last": true
  }
  ```
- **Success Code**: `200 OK`

---

### 7. **Update Book Shareable Status**
- **Method**: `PATCH`  
- **URL**: `http://localhost:8088/books/shareble/{book-id}`  
- **Response Body**:  
  ```json
  {
    "id": 58,
    "shareable": false
  }
  ```
- **Success Code**: `200 OK`

---

### 8. **Update Book Archived Status**
- **Method**: `PATCH`  
- **URL**: `http://localhost:8088/books/archived/{book-id}`  
- **Response Body**:  
  ```json
  {
    "id": 58,
    "archived": true
  }
  ```
- **Success Code**: `200 OK`

---

### 9. **Borrow Book**
- **Method**: `POST`  
- **URL**: `http://localhost:8088/books/borrow/{book-id}`  
- **Response Body**:  
  ```json
  {
    "id": 1,
    "bookId": 58,
    "borrowedBy": "sandesh",
    "borrowedAt": "2024-10-22T10:15:30Z"
  }
  ```
- **Success Code**: `200 OK`

---

### 10. **Return Borrowed Book**
- **Method**: `PATCH`  
- **URL**: `http://localhost:8088/books/borrow/return/{book-id}`  
- **Response Body**:  
  ```json
  {
    "id": 1,
    "bookId": 58,
    "returnedAt": "2024-10-22T10:16:36Z"
  }
  ```
- **Success Code**: `200 OK`

---

### 11. **Approve Book Return**
- **Method**: `PATCH`  
- **URL**: `http://localhost:8088/books/borrow/return/approve/{book-id}`  
- **Response Body**:  
  ```json
  {
    "id": 1,
    "bookId": 58,
    "returnApproved": true,
    "approvedAt": "2024-10-22T10:23:35Z"
  }
  ```
- **Success Code**: `200 OK`

---

### 12. **Upload Book Cover**
- **Method**: `POST`  
- **URL**: `http://localhost:8088/books/cover/{book-id}`  
- **Request**: Multipart file upload  
- **Response Body**:  
  ```json
  {
    "bookId": 58,
    "coverUrl": "http://example.com/book-covers/58.jpg",
    "uploadedAt": "2024-10-22T10:25:30Z"
  }
  ```
- **Success Code**: `202 Accepted`

-----




---------------------------------------------------------------------------------------------------------------------



## Security
Explain how user authentication and authorization are implemented in your project. Discuss any security measures you've taken, such as password hashing, session management, and input validation.

## Testing
Describe how to run unit tests and any additional testing processes. Mention the use of Mockito for testing your project components.

## Deployment
If you have set up CI/CD, provide information on how the project is automatically built and deployed. If not, discuss manual deployment steps.

## Contributing
Explain how others can contribute to your project, whether through bug reports, feature requests, or code contributions. Include a link to your project's GitHub repository.

## License
Specify the project's license, if any, and provide a link to the full license text.

## Resources

- [Book Social Network App](https://www.youtube.com/watch?v=WuPa_XoWlJU&pp=ygUTYm9vayBzb2NpYWwgbmV0d29yaw%3D%3D)
- [Spring Boot Cache](https://medium.com/@geonikpal/spring-boot-cache-18ab22a09f42)
- [Implement JWT authentication in a Spring Boot 3 application](https://medium.com/@tericcabrel/implement-jwt-authentication-in-a-spring-boot-3-application-5839e4fd8fac)
- [Using Docker Compose with Spring Boot and PostgreSQL](https://medium.com/@saygiligozde/using-docker-compose-with-spring-boot-and-postgresql-235031106f9f)
- [Documenting a Spring REST API Using OpenAPI 3.0](https://www.baeldung.com/spring-rest-openapi-documentation)