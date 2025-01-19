import styled from 'styled-components';

export const BookDetailsWrapper = styled.div`
  padding: 1rem;
  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export const CoverImage = styled.div`
  flex: 1;
  img {
    border-radius: 1rem;
  }
`;

export const BookInfo = styled.div`
  flex: 2;
  h2 {
    font-size: 1.5rem;
  }
  h4,
  h5 {
    font-size: 1.2rem;
  }
  .card-subtitle {
    font-size: 0.9rem;
    color: gray;
  }
`;

export const PaginationWrapper = styled.div`
  margin-top: 2rem;
  .pagination {
    justify-content: center;
  }
`;

