import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;

  button {
    padding: 5px 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;

    &.active {
      background-color: #0056b3;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: #ccc;
    }
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;



