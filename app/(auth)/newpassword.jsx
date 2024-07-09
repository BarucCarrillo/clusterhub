import * as React from "react";
import {StyleSheet, View, Text, TextInput } from "react-native";
import Header from "../../src/components/header";
import { Button } from "react-native-elements";

const ForgotPass2 = () => {

    return(
        <View style={styles.rectangleView}>
            <Header/>
            <Text style={styles.labelTitle}>Ingresa tu nueva contraseña</Text>
            
            <View style={styles.passContainer}>
                <Text style={styles.label}>Nueva Contraseña</Text>

                <TextInput style={styles.input} keyboardType="email-address" />

                <Text style={styles.label}>Confirma tu contraseña</Text>

                <TextInput style={styles.input} keyboardType="email-address" />
            </View>

            <Button title={"Cambiar"}
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
        fontSize: 30,
        fontFamily: "Roboto",
        color: "#317b9b",
        textAlign: "center",
        marginTop: 56,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    emailContainer: {
        marginTop: 100, 
        marginLeft: 57,
    },
    label: {
        fontSize: 28,
        fontFamily: "Roboto",
        color: "#317b9b",
        textAlign: "left",
        marginBottom: 20,
        marginLeft: 50
    },
    passContainer: {
        marginTop: 80,
    },
    input: {
        height: 60,
        width: "80%",
        borderColor: '#317b9b',
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 10,
        display: 'flex',
        alignSelf: 'center'

    },
    verButton: {
        backgroundColor: '#16557a',
        borderRadius: 10,
        height: 50,
        width: "80%",
        height: 50,
        marginTop: 30,
        display: 'flex',
        alignSelf: 'center'
    }
})

export default ForgotPass2;