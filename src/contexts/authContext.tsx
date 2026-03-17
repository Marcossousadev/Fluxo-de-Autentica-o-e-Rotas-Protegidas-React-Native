import { createContext, PropsWithChildren, useState, useEffect, useMemo } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
    isLoggedIn: boolean
    isReady: boolean
    signIn: () => void
    signOut: () => void
}

const AUTH_STORAGE_KEY = "@auth-copy:auth-state";

export const AuthContext = createContext<AuthState>({} as AuthState);
 
export function AuthProvider({children}: PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    async function saveStorageState( newState: {isLoggedIn: boolean}){
        try{
            await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState));
        }
        catch(error){
            console.log("ERROR_SET_STORAGE_AUTH", error);
        }
    }

    async function signIn(){
        setIsLoggedIn(true);
       await saveStorageState({ isLoggedIn: true})
        router.push('/');
    }

    async function signOut(){
        setIsLoggedIn(false);
       await saveStorageState({ isLoggedIn: false});
        router.replace('/signIn');
    }

    useEffect(() => {
        async function loadStorageState(){
            try {
                const storageState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
                const state = storageState ? JSON.parse(storageState) : null;
                setIsLoggedIn(state?.isLoggedIn ?? false);
                console.log("STATE =>", state);
            }
            catch(error){
                console.log("ERROR_GET_STORAGE_AUTH", error);
            }
            finally {
                setIsReady(true);
            }
        }
        loadStorageState();
    }, []);

    const value = useMemo(() => ({
        isLoggedIn,
        signIn,
        signOut,
        isReady,
    }), [isReady, isLoggedIn]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}