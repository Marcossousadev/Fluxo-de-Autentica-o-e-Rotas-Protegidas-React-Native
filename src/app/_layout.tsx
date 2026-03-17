import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContext";
export default function MainLayout(){
    return (
       <AuthProvider>
         <Stack>
            <Stack.Screen name="(protected)" options={{headerShown: false}}/>
            <Stack.Screen name="signIn" options={{title:"Entrar"}}/>
            <Stack.Screen name="signUp" options={{title:"Cadastro"}} />
            <Stack.Screen name="forgotPassword" options={{title:"Esqueceu a senha"}}/>
        </Stack>
       </AuthProvider>
    );
}