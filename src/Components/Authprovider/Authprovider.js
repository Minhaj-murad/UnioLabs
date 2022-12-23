import React from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';

import { useState } from 'react';
import { useEffect } from 'react';
import app from '../Shared/firebase.init';


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  
    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const emailverification = () => {
        setLoading(true);
        return sendEmailVerification(auth.currentUser)
    }

    const forgetpassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
    }

    const changepassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
    }
    
   

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            setLoading(false);
            setUser(currentUser);
        });

        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        createUser,
        login,
        logOut,
        emailverification,
        forgetpassword,
        changepassword,
        loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;