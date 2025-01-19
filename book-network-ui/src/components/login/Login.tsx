import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for API calls
import interceptorInstance from '../../app/services/interceptor/interceptor';
import { AuthenticationRequest } from '../../app/services/models/AuthenticationRequest';
import { tokenService } from '../../app/services/token/Token';

// Login Component
const Login = () => {
   const [authRequest, setAuthRequest] = useState<AuthenticationRequest>({ email: '', password: '' });
   const [errorMsg, setErrorMsg] = useState<string[]>([]);
 
   // const history = useHistory(); // Hook to navigate between pages
   const navigate = useNavigate();  // Initialize useNavigate hook
 
   const login = async () => {
     setErrorMsg([]);
     
     try {
       const response = await interceptorInstance.post('auth/authenticate', authRequest); // Replace with your API endpoint

       // Assuming the response contains the token
      tokenService.setToken(response.data.token);  // Store the token using the setToken method

       navigate('/books/');  // Programmatic navigation Redirect to '/books' page after login
     } catch (err) {
       console.log(err);
 
       // TypeScript narrowing for error handling
       if (axios.isAxiosError(err)) {
         // Check if the error is an AxiosError
         if (err.response?.data?.validationErrors) {
           setErrorMsg(err.response.data.validationErrors);
         } else {
           setErrorMsg([err.response?.data?.errorMsg || 'An error occurred.']);
         }
       } else {
         // Fallback for non-Axios errors
         setErrorMsg(['An unknown error occurred.']);
       }
     }
   };
 
   const register = () => {
     navigate('/register'); 
   };
 
   return (
     <div className="container-fluid card login-container">
       <h3 className="text-center">Login</h3>
       <hr />
       {/* Error messages */}
       {errorMsg.length > 0 && (
         <div className="alert alert-danger" role="alert">
           {errorMsg.map((msg, index) => (
             <p key={index}>{msg}</p>
           ))}
         </div>
       )}
 
       {/* Form inputs */}
       <div className="mb-3">
         <label htmlFor="login" className="form-label">Email address</label>
         <input
           type="email"
           className="form-control"
           id="login"
           placeholder="name@example.com"
           value={authRequest.email}
           onChange={(e) => setAuthRequest({ ...authRequest, email: e.target.value })}
         />
       </div>
       <div className="mb-3">
         <label htmlFor="password" className="form-label">Password</label>
         <input
           type="password"
           className="form-control"
           id="password"
           placeholder="Password"
           value={authRequest.password}
           onChange={(e) => setAuthRequest({ ...authRequest, password: e.target.value })}
         />
       </div>
 
       {/* Buttons */}
       <div className="d-flex justify-content-between mb-3">
         <button onClick={login} type="button" className="btn btn-primary">
           <em className="fas fa-sign-in-alt">&nbsp;Sign in</em>
         </button>
         <div>
           Don't have an account?&nbsp;
           <button onClick={register} type="button" className="btn btn-link">
             Register
           </button>
         </div>
       </div>
     </div>
   //   </LoginContainer>
   );
 };
 
 export default Login;