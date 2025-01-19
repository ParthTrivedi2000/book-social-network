import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode

class TokenService {
  // Set token in localStorage
  setToken(token: string):void {
    localStorage.setItem('token', token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token'); // This can return a string or null
  }

  // Check if the token is valid (not expired)
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      // Decode the token to check its expiry date
      const decodedToken: { exp: number } = jwtDecode(token);  // Directly using jwt_decode
      const expiryDate = decodedToken.exp * 1000; // Convert to milliseconds
      const currentDate = Date.now();

      // If the token is expired, clear localStorage and return false
      if (currentDate > expiryDate) {
        localStorage.clear();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return false;
    }
  }

  // Check if the token is not valid (expired or missing)
  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }

  // Get the user's roles from the decoded token
  get userRoles(): string[] {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: { authorities: string[] } = jwtDecode(token);  // Directly using jwt_decode
        console.log(decodedToken.authorities); // For debugging
        return decodedToken.authorities || [];
      } catch (error) {
        console.error('Error decoding token:', error);
        return [];
      }
    }
    return [];
  }
}

export const tokenService = new TokenService(); // Create a singleton instance

