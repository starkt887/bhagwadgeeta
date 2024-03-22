import React, { useContext, useEffect, useState } from "react"
import { auth } from "../services/firebaseService"

interface Auth {
    isloggedin: boolean
    userid?: string
    loading?: boolean
    login?(): void
}


export const AuthContext = React.createContext<Auth>({ isloggedin: false, loading: true })
export const AuthProvider = AuthContext.Provider
export function useAuthContext() {
    return useContext(AuthContext)
}


export function useAuthInit(): Auth {
    const [AuthState, setAuthState] = useState<Auth>({ isloggedin: false, loading: true })
    useEffect(() => {
        //oberserve

        return auth.onAuthStateChanged((firebaseuser) => {
            const auth = firebaseuser ?
                { loading: false, isloggedin: true, userid: firebaseuser.uid } :
                { loading: false, isloggedin: false }
            setAuthState(auth);
        })
    }, [])


    return AuthState
}