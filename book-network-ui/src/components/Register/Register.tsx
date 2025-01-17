import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation
import axios, { AxiosError } from 'axios'; // Assuming you're using axios for HTTP requests
import interceptorInstance from '../../app/services/interceptor/interceptor';
import { RegistrationRequest } from '../../app/services';

const Register = () => {
  const [registerRequest, setRegisterRequest] = useState<RegistrationRequest>({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterRequest({ ...registerRequest, [name]: value });
  };

  const register = async () => {
    setErrorMsg([]); // Clear previous errors

    try {
      const response = await interceptorInstance.post('auth/register', registerRequest); // Replace with your API endpoint
      navigate('/login'); // Redirect to login after successful registration
    } catch (err: unknown) {
      if(axios.isAxiosError(err)) {
         // Now you can safely access `err.response`
         if (err.response?.data?.validationErrors) {
            setErrorMsg(err.response.data.validationErrors); // Set validation errors
          } else {
            setErrorMsg([err.response?.data?.errorMsg || 'An error occurred']);
          }
      } else {
         // Handle cases where the error is not an AxiosError
         console.error('An unexpected error occurred:', err);
      }
    }
  };

  const login = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="container-fluid card login-container">
      <h3 className="text-center">Create an account</h3>
      <hr />
      {errorMsg.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {errorMsg.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="firstname" className="form-label">Firstname</label>
        <input
          type="text"
          className="form-control"
          id="firstname"
          name="firstname"
          placeholder="Firstname"
          value={registerRequest.firstname}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">Lastname</label>
        <input
          type="text"
          className="form-control"
          id="lastname"
          name="lastname"
          placeholder="Lastname"
          value={registerRequest.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="name@example.com"
          value={registerRequest.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Password"
          value={registerRequest.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <button onClick={register} type="button" className="btn btn-primary">
          <em className="fas fa-sign-in-alt">&nbsp;Create an account</em>
        </button>
        <div>
          Already have an account?&nbsp;
          <button onClick={login} type="button" className="btn btn-link">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
