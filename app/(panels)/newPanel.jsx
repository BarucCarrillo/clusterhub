import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/header";
import { Card, Input } from "react-native-elements";
import CustomButton from "../../src/components/CustomButton";
import { Icon } from "react-native-elements";
import CardGrid from "../../src/components/gridWidgets";

const newPanel = () =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [widgetVisible, setWidgetVisible] = useState(false);
    const [saveVisible, setSaveVisible] = useState(false);

    return (
        <SafeAreaView>
            <View >
                <Header title={'Crear Nuevo Panel'}/>
                <View style={styles.cardContainer}>
                    <Card containerStyle={{ height: 600 }}>
                        <Text>Nombre</Text>
                        <Input></Input>
                        <Text>Descripción</Text>
                        <Input></Input>
                        <CustomButton containerStyles={"bg-[#317B9B]"}
                                    textStyles={"text-lg font-semibold text-left mt-2 text-white"} 
                                    title={'Agregar Widget'}
                                    handlePress={() => setWidgetVisible(true)}/>
                    </Card>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                        <Icon name="check-circle" size={20} color="#FFFFFF" style={styles.icon} />
                        <Text style={styles.buttonText}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => router.push('panel')}>
                        <Icon name="cancel" size={20} color="#FFFFFF" style={styles.icon} />
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
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
                        <Text style={styles.modalTitle}>Panel Creado</Text>
                        <Icon name="check-circle" size={48} color="#317B9B" style={styles.icon} onPress={() => router.push('/panel')}/>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={widgetVisible}
                onRequestClose={() => setWidgetVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{fontSize:20, color:"#317B9B", fontWeight:'bold'}}>Selecciona los widgets que deseas que aparezcan en el panel</Text>
                        <Text style={{fontSize:18, color:"#95D7CA", fontWeight:'bold', marginBottom: 20,}}>Máximo de 4 widgets</Text>
                        <CardGrid />
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.button} onPress={() => setSaveVisible(true)}>
                                <Icon name="check-circle" size={20} color="#FFFFFF" style={styles.icon} />
                                <Text style={styles.buttonText}>Aceptar</Text>
                            </TouchableOpacity>
                            <View style={{width:20}}></View>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => router.replace('/newPanel')}>
                                <Icon name="cancel" size={20} color="#FFFFFF" style={styles.icon} />
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={saveVisible}
                onRequestClose={() => setSaveVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Dashboards Agregados</Text>
                        <Icon name="check-circle" size={48} color="#317B9B" style={styles.icon} onPress={() => router.replace('/newPanel')}/>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 50,
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1976D2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      cancelButton: {
        backgroundColor: '#E53935',
      },
      icon: {
        marginRight: 10,
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
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
        marginBottom: 20,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
})

export default newPanel;