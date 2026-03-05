import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/slices/authSlice';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useSelector(selectAuth);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
