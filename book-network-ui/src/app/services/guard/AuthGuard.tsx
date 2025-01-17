import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { Spinner, SpinnerContainer } from './AuthGuard.styled'; // Import the styled components


interface AuthGuardProps {
  children: ReactNode;  // Ensure the correct type for children
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // Get authentication status and loading

  // If loading is true, don't render anything yet
  if (loading) {
    // return null; // Or a loading spinner, etc.
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected children
  return <>{children}</>;
};

export default AuthGuard;
