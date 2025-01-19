import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import {AuthenticationService} from '../../app/services/services/AuthenticationService';
import CodeInput from 'react-code-input';
import { Container, ActivationMessage, ActivationError, Button, CodeForm } from './ActivateAccount.styled';

const ActivateAccount = () => {
  const [message, setMessage] = useState<string>('');
  const [isOkay, setIsOkay] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [code, setCode] = useState<string>(''); // Store the code
  const navigate = useNavigate(); // React Router for navigation

  // Confirm the account with the token
  const confirmAccount = (token: string) => {
   AuthenticationService.confirm(token)  // Send the token to confirm account
   //  AuthenticationService.confirm({ token }) // giving error
      .then(() => {
        setMessage('Your account has been successfully activated.\nNow you can proceed to login');
        setIsOkay(true);
        setSubmitted(true);
      })
      .catch(() => {
        setMessage('Token has been expired or invalid');
        setIsOkay(false);
        setSubmitted(true);
      });
  };

  // Redirect to the login page
  const redirectToLogin = () => {
    navigate('/login');
  };

  // Handler for changes in the code input fields
  const handleCodeChange = (newCode: string) => {
   setCode(newCode); // Update the code state

   // Trigger the account confirmation if the code is fully entered (e.g., 6 digits)
   if (newCode.length === 6) {
     confirmAccount(newCode); // Call the confirmAccount function
   }
 };

  return (
    <Container>
      {submitted ? (
        isOkay ? (
          <ActivationMessage>
            <h2>Activation Successful!</h2>
            <p>Your account has been successfully activated.</p>
            <Button onClick={redirectToLogin}>Go to Login</Button>
          </ActivationMessage>
        ) : (
          <ActivationError>
            <h2>Activation Failed!</h2>
            <p>{message}</p>
            <Button onClick={() => setSubmitted(false)}>Try again</Button>
          </ActivationError>
        )
      ) : (
        <CodeForm>
          <h2>Type your activation code</h2>
          <CodeInput
            value={code} // Bind the input value to the state
            onChange={handleCodeChange} // Trigger onChange to capture code
            type="number" // Set the input type to "number"
            fields={6} // Number of input fields (6 for a 6-digit code)
            name="activationCode" // Optional: Add name
            inputMode="numeric" // Optional: Specify numeric input mode for better mobile experience
          />
          <Button onClick={redirectToLogin}>Go to Login</Button>
        </CodeForm>
      )}
    </Container>
  );
};

export default ActivateAccount;

