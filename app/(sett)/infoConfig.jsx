import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, Modal, Alert, ScrollView } from "react-native";
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
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            setPickedImagePath(result.assets[0].uri); // Ajuste para la nueva API de ImagePicker
            setModalVisible(false);
        }
    };

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            setPickedImagePath(result.assets[0].uri); // Ajuste para la nueva API de ImagePicker
            setModalVisible(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
            <View style={{ flex: 1, }}>
                <Text style={styles.labelTitle}>Información Personal</Text>
                <View style={styles.imageContainer}>
                    {pickedImagePath !== '' && (
                        <Image source={{ uri: pickedImagePath }} style={styles.image} />
                    )}
                    <Icon
                        raised
                        name='camera-retro'
                        type='font-awesome'
                        color='#317B9B'
                        marginTop= '5'
                        onPress={() => setModalVisible(true)}
                    />
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
                        handlePress={() => router.push("/config")}
                    />
                </View>
            </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecciona una opción</Text>
                        <CustomButton handlePress={showImagePicker} title="Seleccionar una imagen" />
                        <CustomButton handlePress={openCamera} title="Abrir cámara" />
                        <CustomButton handlePress={() => setModalVisible(false)} title="Cancelar" />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 10,
        width: "80%",
        alignSelf: 'center',
    },
    infoContainer: {
        marginTop: 5,
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
        fontSize: 25,
        fontFamily: "Roboto",
        color: "#317b9b",
        textAlign: "left",
        marginLeft: 50,
        marginTop: 15,
        marginRight: 60,
        marginBottom: 20,
    },
    btnContainer: {
        marginTop: 10,
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
    imageContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        display: 'flex',
        alignSelf: 'center',
        borderRadius: 120,
    },
});

export default infoConfig;
