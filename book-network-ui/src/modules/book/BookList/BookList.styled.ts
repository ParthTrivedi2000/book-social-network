import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const Alert = styled.div<{ level: 'success' | 'error' }>`
  background-color: ${(props) => (props.level === 'success' ? '#d4edda' : '#f8d7da')};
  color: ${(props) => (props.level === 'success' ? '#155724' : '#721c24')};
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => (props.level === 'success' ? '#c3e6cb' : '#f5c6cb')};
  border-radius: 5px;
`;

export const Pagination = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PaginationList = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 10px;
`;

export const PaginationItem = styled.li<{ disabled: boolean }>`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.disabled ? '#ccc' : '#007bff')};
`;

export const BookListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: flex-start;
`;
