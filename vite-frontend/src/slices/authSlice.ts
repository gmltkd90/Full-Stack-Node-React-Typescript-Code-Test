import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define initial state interface
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

// Initialize state with token from localStorage if available
const initialState: AuthState = {
  // Retrieve token from localStorage
  token: localStorage.getItem('authToken') || null,
  // Set to true if the token exists
  isAuthenticated: !!localStorage.getItem('authToken'), 
};

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login action - triggered when the user logs in
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload);  
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
