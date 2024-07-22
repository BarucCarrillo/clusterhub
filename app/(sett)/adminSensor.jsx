import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import Header from "../../src/components/header";
import { Card, Icon } from "react-native-elements";
import { Table, Row, Rows } from "react-native-table-component";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCiudad } from "../../lib";
import CustomButton from "../../src/components/CustomButton";
import RNPickerSelect from "react-native-picker-select";

const adminSensor = () => {
  const [ciudad, setCiudad] = useState([]);

  const fetchCiudad = async () => {
    try {
      const response = await getCiudad();
      setCiudad(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCiudad();
    console.log(ciudad);
  }, []);

  const header = ["Aula", "Usario", "Topic", "Ciudad"];
  const data = [["B-1", "Cristiano Ronaldo", "Humedad", "Metrocida"]];

  const dataVoid = [
    [
      <>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}

          items={ciudad.map((ciudad) => ({
            label: ciudad.nombre_ciudad,
            value: ciudad.id,
          }))}
        />
      
      </>
    ],
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [newSensor, setNewSensor] = useState(false);

  return (
    <SafeAreaView>
      <View>
        <Header title={"Administrar Sensores"} />
        <ScrollView style={styles.sensorConatiner}>
          <Card containerStyle={{ height: "auto", borderRadius: 5 }}>
            <Text style={styles.title}>NOMBRE DEL SENSOR</Text>
            <Text style={styles.subtitle}>TIPO DE SENSOR</Text>
            <Table>
              <Row
                textStyle={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 18,
                }}
                data={header}
              />
              <Rows
                textStyle={{ textAlign: "center", fontSize: 14 }}
                data={data}
              />
            </Table>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </Card>
          <CustomButton
            title="Agregar panel"
            containerStyles={"bg-[#317B9B]"}
            textStyles={"text-lg font-semibold text-center mt-2 text-white"}
            handlePress={() => setNewSensor(true)}
          />
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Nombre del Sensor"
              style={styles.input}
            ></TextInput>
            <TextInput
              placeholder="Tipo de Sensor"
              style={styles.input}
            ></TextInput>
            <Table>
              <Row
                textStyle={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 18,
                }}
                data={header}
              />
              <Rows
                textStyle={{ textAlign: "center", fontSize: 14 }}
                data={dataVoid}
              />
            </Table>
            <View style={styles.btnContainer}>
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
                <Text style={styles.buttonText}>Aceptrar</Text>
              </TouchableOpacity>
              <View style={{ width: 20 }}></View>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => router.replace("/adminSensor")}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={newSensor}
        onRequestClose={() => setNewSensor(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Nombre del Sensor"
              style={styles.input}
            ></TextInput>
            <TextInput
              placeholder="Tipo de Sensor"
              style={styles.input}
            ></TextInput>
            <Table>
              <Row
                textStyle={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 18,
                }}
                data={header}
              />
              <Rows
                textStyle={{ textAlign: "center", fontSize: 14 }}
                data={dataVoid}
              />
            </Table>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.button}
                //onPress={() => }
              >
                <Icon
                  name="check-circle"
                  size={20}
                  color="#FFFFFF"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <View style={{ width: 20 }}></View>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => router.replace("/adminSensor")}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Roboto",
    marginBottom: 15,
    marginTop: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976D2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#E53935",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 350,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "left",
  },
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  tableInput: {
    textAlign: "center",
    marginTop: 10,
  },
});

export default adminSensor;
