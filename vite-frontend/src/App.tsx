import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { login } from './slices/authSlice';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';
import InvoiceList from './components/InvoiceList';
import { RootState } from './store';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // checking for the token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !isAuthenticated) {
      // automatically log in the user if the token exists
      dispatch(login(token)); 
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <div>
        <h1></h1>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginForm />} />

          {/* Redirect to /main if authenticated, else to /login */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/main" /> : <Navigate to="/login" />}
          />

          {/* Main Page (Accessible only when authenticated) */}
          <Route
            path="/main"
            element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
          />

          {/* Invoices Page (Protected, only accessible when authenticated) */}
          <Route
            path="/invoices"
            element={isAuthenticated ? <InvoiceList /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
