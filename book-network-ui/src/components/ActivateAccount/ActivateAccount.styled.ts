import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ActivationMessage = styled.div`
  text-align: center;
`;

export const ActivationError = styled.div`
  text-align: center;
  color: red;
`;

export const CodeForm = styled.div`
  text-align: center;
  width: 400px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

// Add custom styles for the CodeInput if needed
export const CodeInputWrapper = styled.div`
  .code-input {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    input {
      width: 40px;
      height: 40px;
      text-align: center;
      font-size: 20px;
      border-radius: 5px;
      border: 1px solid #ccc;
      margin: 0 5px;
    }

    input:focus {
      border-color: #007bff;
    }
  }
`;
