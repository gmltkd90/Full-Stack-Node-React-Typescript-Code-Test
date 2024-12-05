import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { z } from 'zod'; 
import { loginSchema } from '../validation/LoginValidation'; 
import { login } from '../slices/authSlice'; 
import { Navigate } from 'react-router-dom';  

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectToMain, setRedirectToMain] = useState(false); 

  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors([]);

    try {
      loginSchema.parse({ email, password });

      setIsSubmitting(true);

      // Make an API request to authenticate the user
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);

        dispatch(login(response.data.token)); 

        setRedirectToMain(true); 
      }

    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err: { message: string }) => err.message);
        setErrors(errorMessages);
      } else {
        setErrors(['Failed to authenticate. Please check your credentials.']);
      }
      setIsSubmitting(false);
    }
  };

  if (redirectToMain) {
    // If login is successful, redirect to main page
    return <Navigate to="/" />;
  }

  return (
    <div className="login-form">
      <h2>Login</h2>

      {errors.length > 0 && (
        <div className="error-messages">
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
