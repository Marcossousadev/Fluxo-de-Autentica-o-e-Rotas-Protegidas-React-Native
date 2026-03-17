import { View, Button, StyleSheet } from "react-native";
import { useAuth } from "@/hooks/useAuth";
export default function SignIn(){
    const { signIn } = useAuth();
    return (
        <View style={styles.container}>
            <Button onPress={signIn} title="Entrar"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center"
    }
});