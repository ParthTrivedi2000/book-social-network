import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #007bff;
  color: #007bff;
  background-color: transparent;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

export const Pagination = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const PaginationItem = styled.li`
  margin: 0 2px;
`;

export const PaginationLink = styled.a<{ active?: boolean; disabled?: boolean }>`
  display: block;
  padding: 0.5rem 0.75rem;
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  background-color: ${({ active }) => (active ? '#007bff' : 'transparent')};
  border: 1px solid #007bff;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'transparent' : '#007bff')};
    color: ${({ disabled }) => (disabled ? '#007bff' : '#fff')};
  }
`;