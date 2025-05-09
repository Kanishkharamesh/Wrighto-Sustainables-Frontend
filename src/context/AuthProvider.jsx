// // context/AuthProvider.jsx
// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await axios.get("http://localhost:5000/api/user/me", {
//                     withCredentials: true
//                 });
//                 setUser(res.data);
//                 setIsLoggedIn(false);
//             } catch (err) {
//                 setUser(null);
//                 setIsLoggedIn(false);
//             }
//         };

//         fetchUser();
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user, isLoggedIn }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // ✅ This hook must be defined like this:
// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Loading state to handle async fetch
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/user/me", {
                    withCredentials: true
                });
                if (res.data) {
                    setUser(res.data);
                    setIsLoggedIn(true);  // User is logged in
                }
            } catch (err) {
                setUser(null);
                setIsLoggedIn(false);  // User is not logged in due to error
                console.error("Failed to fetch user:", err);
            } finally {
                setLoading(false);  // Stop loading when the request is done
            }
        };

        fetchUser();
    }, []);

    // Provide loading, isLoggedIn, and user data to the components
    return (
        <AuthContext.Provider value = {{ user, isLoggedIn, loading, setUser, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ This hook must be defined like this:
export const useAuth = () => useContext(AuthContext);
