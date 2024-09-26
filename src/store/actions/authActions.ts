import { authStart, authSuccess, authFail, logout } from '../reducers/authSlice';
import { AppDispatch } from '../store';

interface Credentials {
  username: string;
  password: string;
}

// Login Action Creator
export const login = (credentials: Credentials) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
      // Simulate API call for login (replace this with your actual API call)
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(credentials),
      // });

      // if (!response.ok) {
      //   throw new Error('Login failed');
      // }

      // const data = await response.json();
      const data:any = { token: 'mock_token' }; // Replace with the actual token from API

      // Save token and authentication state to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      dispatch(authSuccess({ token: data.token }));
      //dispatch(authSuccess(data)); // Dispatch success action
    } catch (error) {
      dispatch(authFail((error as Error).message)); // Dispatch failure action
    }
  };
};

// Logout Action Creator
export const logoutUser = () => {
  return (dispatch: AppDispatch) => {
    // Remove token and auth state from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    dispatch(logout()); // Dispatch logout action
  };
};

// Restore Authentication Action Creator
export const restoreAuthState = () => {
  return (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const data:any = { token: token }; 

    if (token && isAuthenticated) {
      dispatch(authSuccess({ token: data.token })); // If token is present, restore the authentication state
    } else {
      dispatch(logout()); // If no token, ensure the user is logged out
    }
  };
};
