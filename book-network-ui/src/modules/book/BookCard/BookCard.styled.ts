import styled from 'styled-components';

export const Card = styled.div`
  width: 20rem;
  max-height: 450px;
  min-height: 450px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const CardBody = styled.div`
  padding: 1rem;
  overflow-y: auto;
`;

export const CardTitle = styled.h5`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardSubtitle = styled.h6`
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
`;

export const CardText = styled.p`
  font-size: 0.875rem;
  color: #333;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f8f9fa;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Icon = styled.i`
  cursor: pointer;
  font-size: 1.25rem;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;