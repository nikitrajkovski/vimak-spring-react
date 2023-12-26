class AuthService {
    isAuthenticated() {
      // Check if the user is authenticated (e.g., check if a token is present)
      return localStorage.getItem('token') !== null;
    }
  
    login() {
      // Simulate a login by setting a token in localStorage
      localStorage.setItem('token', 'your_token_here');
    }
  
    logout() {
      // Simulate a logout by removing the token from localStorage
      localStorage.removeItem('token');
    }
  }
  
  export default new AuthService();