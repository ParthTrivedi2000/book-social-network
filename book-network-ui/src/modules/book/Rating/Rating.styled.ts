import styled from 'styled-components';

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Star = styled.i`
  cursor: pointer;
  font-size: 1.5rem;
  color: #f39c12; // Adjust color for full star
  &:hover {
    color: #e67e22; // Optional: a color change on hover
  }
`;

export const HalfStar = styled.i`
  cursor: pointer;
  font-size: 1.5rem;
  color: #f39c12; // Adjust color for half star
  &:hover {
    color: #e67e22; // Optional: a color change on hover
  }
`;
