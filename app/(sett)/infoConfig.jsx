import * as React from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../src/components/CustomButton";


const infoConfig = () => {
    return(

        <SafeAreaView>
            <View>
                <Text style={styles.labelTitle}>INFORMACIÓN PERSONAL</Text>
                <Image style={styles.img} source={{uri:'https://th.bing.com/th/id/OIP.NnQzuZFcKjxCImErUgu_fwHaE7?rs=1&pid=ImgDetMain',}}></Image>
                <View style={styles.infoContaienr}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput style={styles.input}/>
                    <Text style={styles.label}>Apellidos</Text>
                    <TextInput style={styles.input}/>
                    <Text style={styles.label}>Correo</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.btnContainer}>
                    <CustomButton
                        title={"Guardar Cambios"}
                        containerStyles={"bg-[#317B9B]"}
                        borderColor={"secondary"}
                        textStyles={"text-lg font-semibold text-center mt-2 text-white"}
                        handlePress={() => router.push("/home")}>
                    </CustomButton>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        borderColor: '#ccc',
        borderWidth: 3,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: "90%",
        display: 'flex',
        alignSelf: 'center',
        width: "80%"
    },
    labelTitle: {
        fontSize: 32,
        fontWeight: "700",
        fontFamily: "Roboto",
        color: "#317b9b",
        textAlign: 'center',
        marginTop: 30
    },
    label: {
        fontSize: 28,
        fontFamily: "Roboto",
        color: "#317b9b",
        textAlign: "left",
        marginLeft: 50,
        marginTop: 15,
        marginRight: 60,
        marginBottom: 20,
    },
    btnContainer: {
        marginTop: 25,
    },
    infoContaienr: {
        marginTop: 10,
    },
    img: {
        width: "45%",
        height: "25%",
        marginTop: 25,
        display: 'flex',
        alignSelf: 'center',
        borderRadius: 100,
    }
})

export default infoConfig;