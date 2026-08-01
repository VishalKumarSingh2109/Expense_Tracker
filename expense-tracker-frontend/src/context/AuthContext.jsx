import { createContext } from 'react';

// user: { id, name, email } | null
// token: string | null
// login(token, user), logout(), isAuthenticated
const AuthContext = createContext(null);

export default AuthContext;
