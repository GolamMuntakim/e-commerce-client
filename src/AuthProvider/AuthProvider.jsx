import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.Config";
import {getAuth,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,updateProfile} from 'firebase/auth'
import axios from "axios"
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithGoogle(auth,googleProvider)
    }
    const logOut = async() =>{
        setLoading(true)
        const {data} = await axios(`http://localhost:5000/logout`,{
            withCredentials:true
        })
        console.log(data)
        return signOut(auth)
    }
    const updateUserProfile = (name, photo)=>{
        return updateProfile(auth.currentUser,{
            displayName : name,
            photoURL: photo,
        })
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{return unsubscribe()}
    },[])
    const authInfo = {
        user, setUser, loading, setLoading, createUser , signIn, signInWithGoogle, logOut,updateUserProfile 
    }
    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;