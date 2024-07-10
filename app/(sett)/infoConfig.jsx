import * as React from "react";
import { TextInput, View } from "react-native";


const infoConfig = () => {
    return(
        <View>
            <Text>Nombre</Text>
            <TextInput/>
            <Text>Apellidos</Text>
            <TextInput/>
            <Text>Correo</Text>
            <TextInput/>
        </View>
    )
}

export default infoConfig;