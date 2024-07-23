import React, { useState } from "react";
import {View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Modal, Button} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/header";
import EditGridCharts from "../../src/components/EditGridCharts";
import { router } from "expo-router";
import CardGrid from "../../src/components/gridWidgets";

const editPanel = () => {

  const [widgetVisible, setWidgetVisible] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  

    return(
        <SafeAreaView>
            <ScrollView>
                <Header title={'Editar Panel'}/>
                    <View>
                        <Text style={styles.text}>Nombre del Panel</Text>
                        <TextInput placeholder="Titulo" style={styles.input}></TextInput>
                        <Text style={styles.text}>Descripción del Panel</Text>
                        <TextInput placeholder="Descripción" style={styles.input}></TextInput>
                    </View>
                    <View>
                        <EditGridCharts/>
                    </View>
                    <View style={styles.btnWidget}>
                      <Button title="Agregar Nuevo Widget" color={"#95D7CA"} onPress={() => setWidgetVisible(true)}></Button>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => setSaveVisible(true)} >
                            <Icon
                            name="check-circle"
                            size={20}
                            color="#FFFFFF"
                            style={styles.icon}
                            />
                            <Text style={styles.buttonText}>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => router.push("panel")}
                        >
                            <Icon name="cancel" size={20} color="#FFFFFF" style={styles.icon} />
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                      animationType='slide'
                      transparent={true}
                      visible={saveVisible}
                      onRequestClose={() => setSaveVisible(false)}>
                          <View style={styles.modalContainer}>
                              <View style={styles.modalContent}>
                                  <Text style={styles.modalTitle}>Cambios Guardados</Text>
                                  <Icon
                                  name="check-circle"
                                  size={48}
                                  color="#317B9B"
                                  onPress={() => router.push('/panel')}
                                  />
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
                          <Text
                            style={{ fontSize: 20, color: "#317B9B", fontWeight: "bold" }}
                          >
                            Selecciona los widgets que deseas que aparezcan en el panel
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                              color: "#95D7CA",
                              fontWeight: "bold",
                              marginBottom: 20,
                            }}
                          >
                            Máximo de 4 widgets
                          </Text>
                          {/* <CardGrid /> */}
                          <View style={styles.container}>
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() => setWidgetVisible(false)}
                            >
                              <Icon
                                name="check-circle"
                                size={20}
                                color="#FFFFFF"
                                style={styles.icon}
                              />
                              <Text style={styles.buttonText}>Aceptar</Text>
                            </TouchableOpacity>
                            <View style={{ width: 20 }}></View>
                            <TouchableOpacity
                              style={[styles.button, styles.cancelButton]}
                              onPress={() => setWidgetVisible(false)}
                            >
                              <Icon
                                name="cancel"
                                size={20}
                                color="#FFFFFF"
                                style={styles.icon}
                              />
                              <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Modal>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 50,
      },
      button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#317B9B",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      cancelButton: {
        backgroundColor: "#E53935",
      },
      icon: {
        marginRight: 10,
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
      },
      text: {
        fontSize: 24,
        fontFamily: 'Roboto',
        marginTop: 15,
        marginLeft: 15,
        fontWeight: 'bold',
        color: "#317B9B",
      },
      input: {
        fontSize: 18,
        marginLeft: 15,
      },
      btnWidget: {
        width: '80%',
        display: 'flex',
        alignSelf: 'center',
        marginTop: 30,
      },
      modalContainer: {
        flex: 1,
        height: 'auto',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      },
      modalContent: {
        width: 350,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
      },
      modalTitle: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: "Roboto",
        fontWeight: "bold",
        textAlign: "center",
      },
})

export default editPanel;