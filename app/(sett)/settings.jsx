import * as React from "react";
import { View, StyleSheet, Text } from "react-native";


const settings = () => {
    return(
        <View style={styles.settContainer}>
            <View style={styles.set}>
                <Text>Información Personal</Text>
            </View>
            <View style={styles.set}>
                <Text>Cambiar Contraseña</Text>
            </View>
            <View style={styles.set}>
                <Text style={styles.settLabel}>Cerrar Sesión</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    settContainer: {

    },
    set: {
        borderRadius: 8,
        backgroundColor: "#fff",
        flex: 1,
        width: "100%",
        height: 70
    },
    settLabel: {
        fontSize: 24,
        fontWeight: "500",
        fontFamily: "Roboto-Medium",
        color: "#317b9b",
        textAlign: "center",
    }
})

export default settings;