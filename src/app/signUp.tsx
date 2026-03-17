import { Button, View, StyleSheet } from "react-native";

export default function SignUp(){
    return (
        <View style={styles.container}>
            <Button title="Cadastrar-se"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
    }
});