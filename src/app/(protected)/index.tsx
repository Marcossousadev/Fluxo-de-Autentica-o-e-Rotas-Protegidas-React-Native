import { View, Button, StyleSheet} from "react-native";
import { useAuth } from "@/hooks/useAuth";
export default function Index(){
    const { signOut } = useAuth();
    return (
        <View style={styles.container}>
            <Button onPress={signOut} title="Sair"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
    }
})