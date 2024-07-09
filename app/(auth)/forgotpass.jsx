import * as React from "react";
import {StyleSheet, View, Text, TextInput, Button } from "react-native";
import Header from "../../src/components/header";
import { router } from "expo-router";
import CustomButton from "../../src/components/CustomButton";

const ForgotPass = () => {
    return(
        <View style={styles.rectangleView}>
            <Header/>
            <Text style={styles.labelTitle}>Ingresa tu correo para verificar su existencia</Text>
            
            <View style={styles.emailContainer}>
                <Text style={styles.label}>Correo</Text>
                <TextInput style={styles.input} keyboardType="email-address" />

                
            </View>

            <CustomButton title={"Verificar"}
                    containerStyles={"bg-[#317B9B]"}
                    textStyles={"text-lg font-semibold text-center mt-2 text-white"}
                    handlePress={() => router.push("/newpassword")}
            />

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
        marginTop: 80, 
        width: "100%",
        
    },
    label: {
        fontSize: 24,
        fontFamily: "Roboto",
        color: "#317b9b",
        textAlign: "left",
        marginBottom: 20,
        marginLeft: 50,
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
        backgroundColor: "#16557a",
        borderRadius: 10,
        height: 50,
        width: "60%",
        height: 50,
        marginTop: 20,
        marginLeft: 25,
    }
})

export default ForgotPass;