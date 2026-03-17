import { createContext, PropsWithChildren, useState, useEffect } from "react";
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
 
const router = useRouter();
 
export function AuthProvider({children}: PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isReady, setIsReady] = useState(false);
    async function storageState( newState: {isLoggedIn: boolean}){
        try{
            await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState));
        }
        catch(error){
            console.log("ERROR_SET_STORAGE_AUTH", error);
        }
    }

    function signIn(){
        setIsLoggedIn(true);
        storageState({ isLoggedIn: true})
        router.push('/');
    }

    function signOut(){
        setIsLoggedIn(false);
        storageState({ isLoggedIn: false});
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
                setIsReady(false);
            }
            finally {
                setIsReady(true);
            }
        }
        loadStorageState();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, signIn, signOut, isReady}}>
            {children}
        </AuthContext.Provider>
    )
}