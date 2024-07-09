import * as React from "react";
import {StyleSheet, View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../src/components/header";

const ForgotPass = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.rectangleView}>
            <Header/>
            <Text style={styles.title}>Ingresa tu correo para verificar su existencia</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rectangleView: {
        borderTopLeftRadius: 60,
    	backgroundColor: "#f5f5f5",
    	flex: 1,
    	width: "100%",
    }
})

export default ForgotPass;