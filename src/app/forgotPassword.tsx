import { Button, View, StyleSheet } from "react-native";

export default function ForgotPassword(){
    return(
        <View>
            <Button title="Enviar código"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
    }
});