import React, { createContext, useEffect, useState } from 'react';
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebse.config';


export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {

    const googleProvider = new GoogleAuthProvider();
    const [ user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const profileUpdateData = (user, regName)=> {
        return updateProfile(auth.currentUser, {
            displayName: regName
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            console.log(error)
            // An error occurred
            // ...
          });
    }

    const logOut = () =>{
        return signOut(auth);

    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
           console.log(currentUser)
           setUser(currentUser);
           setLoading(false)
       });
       return () =>{
           unsubscribe();
       }
   } ,[])



   const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleSignIn,
        profileUpdateData,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;