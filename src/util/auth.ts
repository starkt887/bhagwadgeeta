import React, { useContext, useEffect, useState } from "react"
import { auth } from "../services/firebaseService"
import { useLangauge } from "../services/settingService"

interface Auth {
    isloggedin: boolean
    userid?: string
    loading?: boolean
    language?: string
    login?(): void
    updateLanguage?(lang: string): void
}


export const AuthContext = React.createContext<Auth>({ isloggedin: false, loading: true })
export const AuthProvider = AuthContext.Provider
export function useAuthContext() {
    return useContext(AuthContext)
}


export function useAuthInit(): Auth {
    const [AuthState, setAuthState] = useState<Auth>({
        isloggedin: false, loading: true
    })
    useEffect(() => {
        //oberserve

        return auth.onAuthStateChanged(async (firebaseuser) => {
            const { getLanguage } = useLangauge();
            let auth: Auth;
            if (firebaseuser) {
                let language = await getLanguage(firebaseuser.uid, 'data')
                auth = {
                    ...AuthState,
                    loading: false,
                    isloggedin: true,
                    userid: firebaseuser.uid,
                    language: language ? language : 'english'
                }
            }
            else {
                auth = { ...AuthState, loading: false, isloggedin: false, language: 'english' }
            }
            // console.log(auth)
            setAuthState(auth);
        })
    }, [])


    return AuthState
}