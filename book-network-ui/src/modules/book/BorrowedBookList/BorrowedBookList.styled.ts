// import styled from 'styled-components';

// export const Container = styled.div`
//   padding: 20px;
//   max-width: 800px;
//   margin: 0 auto;
// `;

// export const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-top: 20px;

//   th, td {
//     padding: 12px;
//     text-align: left;
//   }

//   th {
//     background-color: #f8f9fa;
//   }

//   td {
//     border-top: 1px solid #ddd;
//   }
// `;

// export const Pagination = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 20px;
// `;

// export const Button = styled.button`
//   background-color: transparent;
//   border: 1px solid #ccc;
//   padding: 8px 16px;
//   cursor: pointer;

//   &:disabled {
//     cursor: not-allowed;
//     opacity: 0.5;
//   }

//   &.active {
//     background-color: #007bff;
//     color: white;
//   }
// `;

// export const Form = styled.form`
//   margin-top: 20px;
// `;

// export const FormGroup = styled.div`
//   margin-bottom: 10px;
// `;

// export const Label = styled.label`
//   display: block;
//   font-weight: bold;
// `;

// export const TextArea = styled.textarea`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// export const RangeInput = styled.input`
//   width: 50%;
//   margin-right: 10px;
// `;


// // 2nd version
// import styled from 'styled-components';

// export const StyledTable = styled.table`
//   width: 100%;
//   margin-bottom: 20px;
//   th, td {
//     text-align: left;
//     padding: 8px;
//   }
// `;

// export const StyledPagination = styled.div`
//   .pagination {
//     display: flex;
//     justify-content: center;
//     gap: 10px;
//   }

//   .page-item .page-link {
//     cursor: pointer;
//   }

//   .page-item .disabled {
//     cursor: not-allowed;
//   }
// `;

// export const StyledForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// `;

// export const StyledButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// export const StyledLink = styled.a`
//   color: #dc3545;
//   text-decoration: none;
//   cursor: pointer;
//   &:hover {
//     text-decoration: underline;
//   }
// `;


//3rd version
import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f4f4f4;
  }
`;

export const StyledPagination = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .page-item .page-link {
    cursor: pointer;
  }

  .page-item .disabled {
    cursor: not-allowed;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

export const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StyledLink = styled.a`
  color: #dc3545;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledFeedbackNote = styled.div`
  font-size: 1.2em;
  margin-top: 10px;
`;

export const StyledRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StyledRangeInput = styled.input`
  width: 25%;
`;

export const StyledContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledBookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledBookRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const StyledBookLabel = styled.div`
  width: 10%;
  font-weight: bold;
`;

export const StyledBookDetail = styled.div`
  width: 90%;
`;

export const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledRatingStar = styled.i`
  color: #ff9900;
`;
