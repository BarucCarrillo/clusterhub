import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, Modal, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../src/components/CustomButton";
import { Icon } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";

const infoConfig = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pickedImagePath, setPickedImagePath] = useState('https://th.bing.com/th/id/OIP.NnQzuZFcKjxCImErUgu_fwHaE7?rs=1&pid=ImgDetMain');

    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            setModalVisible(false);
        }
    };

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }
        const result = await ImagePicker.launchCameraAsync();
        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            setModalVisible(false);
        }
    };

    return (
        <SafeAreaView>
            <View>
                <Text style={styles.labelTitle}>Información Personal</Text>
                <Image style={styles.img} source={{ uri: pickedImagePath }}></Image>
                <View style={styles.iconContainer}>
                    <Icon
                        raised
                        name='camera-retro'
                        type='font-awesome'
                        color='#317B9B'
                        onPress={() => setModalVisible(true)} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput style={styles.input} />
                    <Text style={styles.label}>Apellidos</Text>
                    <TextInput style={styles.input} />
                    <Text style={styles.label}>Correo</Text>
                    <TextInput style={styles.input} />
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecciona una opción</Text>
                        <Button onPress={showImagePicker} 
                                title="Seleccionar una imagen"
                                buttonStyle={styles.btnModal} />
                        <Button onPress={openCamera} title="Abrir cámara" />
                        <Button onPress={() => setModalVisible(false)} title="Cancelar" />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 50,
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
    infoContainer: {
        marginTop: 10,
    },
    img: {
        width: "48%",
        height: "25%",
        marginTop: 25,
        display: 'flex',
        alignSelf: 'center',
        borderRadius: 120,
    },
    iconContainer: {
        display: 'flex',
        alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 350,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 25,
    },
});

export default infoConfig;
