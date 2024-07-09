import * as React from "react";
import {StyleSheet, View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import { Button } from "react-native-elements";

const ForgotPass = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.rectangleView}>
            <Header/>
            <Text style={styles.labelTitle}>Ingresa tu correo para verificar su existencia</Text>
            
            <View style={styles.emailContainer}>
                <Text style={styles.label}>Correo</Text>
                <TextInput style={styles.input} keyboardType="email-address" />
            </View>

            <Button title={"Verificar"}
                    buttonStyle={styles.verButton}/>
        </View>
    )
}

const styles = StyleSheet.create({
    rectangleView: {
        borderTopLeftRadius: 60,
    	backgroundColor: "#f5f5f5",
    	flex: 1,
    	width: "100%",
    },
    labelTitle: {
        fontSize: 24,
        fontFamily: "Roboto",
        color: "#317b9b",
        textAlign: "center",
        marginTop: 56,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    emailContainer: {
        marginTop: 100, 
        width: "80%"
    },
    label: {
        fontSize: 24,
        fontFamily: "Roboto",
        color: "#317b9b",
        textAlign: "left",
        marginBottom: 20
    },
    input: {
        height: 60,
        width: "80%",
        borderColor: '#317b9b',
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 10,
    },
    verButton: {
        backgroundColor: '#16557a',
        borderRadius: 10,
        height: 50,
        width: "60%",
        height: 50,
        marginTop: 20,
        marginLeft: 25,
        display: 'flex',
        alignSelf: 'center'
    }
})

export default ForgotPass;