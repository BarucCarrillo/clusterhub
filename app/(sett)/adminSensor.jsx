import { useEffect, useState } from "react";
import LoadingScreen from "../../src/components/LoadingScreen";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import SensorCard from "../../src/components/sensorCard";
import Header from "../../src/components/header";
import { Card, Icon } from "react-native-elements";
import { Table, Row, Rows } from "react-native-table-component";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { crearSensor, getSensorUser, deleteSensor, editSensor } from "../../lib";
import CustomButton from "../../src/components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import RNPickerSelect from "react-native-picker-select";

const adminSensor = () => {
  const { user, loading } = useGlobalContext();

  const id = user.id;

  const [form, setForm] = useState({
    nombre: "",
    tipo_sensor: "",
    user_id: id,
    topico: "",
    pais: "",
    ciudad: "",
    universidad: "",
    edificio: "",
    aula: "",
  });

  const [sensor, setSensor] = useState([]);

  // Fetch functions

  const fetchSensorUser = async () => {
    try {
      const response = await getSensorUser(id);
      setSensor(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchSensorUser();
  }, []);




  const header = ["", "", "", ""];
  const handleDelete = async (id) => {
    try {
      await deleteSensor(id);
      setModalSave(false);
      fetchSensorUser();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSave = async () => {
    try {
      await crearSensor(form);
      router.replace("/adminSensor");
    } catch (error) {
      console.error("Error:", error);
    }


  };


  const handlEdit = async () => {
    try {
      await editSensor(form);
      router.replace("/adminSensor");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [modalSave, setModalSave] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [newSensor, setNewSensor] = useState(null);



  useEffect(() => {
    if (selectedSensor) {
      setForm({
        nombre: selectedSensor.nombre_sensor || "",
        tipo_sensor: selectedSensor.tipo_sensor || "",
        topico: selectedSensor.topico || "",
        pais: selectedSensor.pais || "",
        estado: selectedSensor.estado || "",
        ciudad: selectedSensor.ciudad || "",
        universidad: selectedSensor.universidad || "",
        edificio: selectedSensor.edificio || "",
        aula: selectedSensor.aula || "",
        user_id: selectedSensor.user_id,
        id: selectedSensor.id_sensor,
      });
    }
  }, [selectedSensor]);



  const handleInputChange = (name, value) => {
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };


  return (
    <SafeAreaView className="flex-1">
      <LoadingScreen isLoading={loading} />
      <Header title={"Administrar Sensores"} />

      <FlatList
        keyExtractor={(item) => item.id_sensor}
        className="px-4 mb-4"
        data={sensor}
        renderItem={({ item }) => {
          return (
            <>
              <SensorCard
                nombre={item.nombre_sensor}
                tipo={item.tipo_sensor}
                aula={item.aula}
                correo={item.correo}
                topico={item.topic}
                ciudad={item.ciudad}
                universidad={item.universidad}
                edificio={item.edificio}
                fecha={item.fecha}
                handlePress={() => {
                  setModalVisible(true);
                  setSelectedSensor(item);
                }}
                handleDelete={() => {
                  setModalSave(true);
                  setSelectedSensor(item);
                }}
              />

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text className="text-lg text-secondary font-semibold text-center">
                      Editar el sensor {selectedSensor?.nombre_sensor}
                    </Text>
                    <TextInput
                      defaultValue={selectedSensor?.nombre_sensor}
                      placeholder="Nombre del Sensor"
                      style={styles.input}
                     onChangeText={(text) => handleInputChange("nombre", text)}
                    />

                    <TextInput
                      defaultValue={selectedSensor?.topic}
                      placeholder="Topico"
                      style={styles.input}
                      onChangeText={(text) =>
                        handleInputChange("topico", text)
                      }
                    />
                      <TextInput
                      defaultValue={selectedSensor?.tipo_sensor}
                      placeholder="Tipo sensor"
                      style={styles.input}
                      onChangeText={(text) =>
                        handleInputChange("tipo_sensor", text)
                      }
                    />
                    <TextInput
                      defaultValue={selectedSensor?.pais}
                      placeholder="Pais"
                      style={styles.input}
                      onChangeText={(text) => 
                        handleInputChange("pais", text)
                      }
                    />
                    <TextInput
                      defaultValue={selectedSensor?.estado}
                      placeholder="Estado"
                      style={styles.input}
                      onChangeText={(text) =>
                        handleInputChange("estado", text)
                      }
                    />
                    <TextInput
                      defaultValue={selectedSensor?.ciudad}
                      placeholder="Ciudad"
                      style={styles.input}
                      onChangeText={(text) =>
                        handleInputChange("ciudad", text)
                        }
                    />
                    <TextInput
                      defaultValue={selectedSensor?.universidad}
                      placeholder="Universidad"
                      style={styles.input}
                      onChangeText={(text) =>
                        handleInputChange("universidad", text)
                      }
                    />
                    <TextInput
                      defaultValue={selectedSensor?.edificio}
                      placeholder="Edificio"
                      style={styles.input}
                      onChangeText={(text) =>
                        handleInputChange("edificio", text)
                      }
                    />
                    <TextInput
                      defaultValue={selectedSensor?.aula}
                      placeholder="Aula"
                      style={styles.input}
                      onChangeText={(text) =>
                        handleInputChange("aula", text)
                      }
                    />
                    <View style={styles.btnContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handlEdit}
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
                        onPress={() => setModalVisible(false)}
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
                visible={
                  modalSave && selectedSensor?.id_sensor === item.id_sensor
                }
                onRequestClose={() => setModalSave(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text>
                      Esta seguro que desea eliminar el sensor{" "}
                      {item.nombre_sensor}
                    </Text>
                    <View style={styles.btnContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleDelete(item.id_sensor)}
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
                        onPress={() => setModalSave(false)}
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
                    <Text style={styles.title}>Agregar Sensor</Text>

                    <TextInput
                      placeholder="Nombre del Sensor"
                      style={styles.input}
                      onChangeText={(text) =>
                        setForm({ ...form, nombre: text })
                      }
                    />
                    <TextInput
                      placeholder="Topico"
                      style={styles.input}
                      onChangeText={(text) => setForm({ ...form, topic: text })}
                    />

                    <View style={styles.btnContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleSave}
                      >
                        <Icon
                          name="check-circle"
                          size={20}
                          color="#FFFFFF"
                          style={styles.icon}
                        />
                        <Text style={styles.buttonText}>Crear</Text>
                      </TouchableOpacity>
                      <View style={{ width: 20 }}></View>
                      <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => setModalVisible(false)}
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
            </>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <Text className="text-center p-10">No tienes sensores creados</Text>
          );
        }}
      />

      <CustomButton
        title="Crear Sensor "
        containerStyles={"bg-[#317B9B]"}
        textStyles={"text-lg font-semibold text-center mt-2 text-white"}
        handlePress={() => setNewSensor(true)}
      />

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
              onChangeText={(text) => setForm({ ...form, nombre: text })}
            ></TextInput>
            <TextInput
              placeholder="Topico"
              style={styles.input}
              onChangeText={(text) => setForm({ ...form, topic: text })}
            ></TextInput>
            <TextInput
              placeholder="Pais"
              style={styles.input}
              onChangeText={(text) => setForm({ ...form, pais: text })}
            />
            <TextInput
              placeholder="Estado"
              style={styles.input}
              onChangeText={(text) => setForm({ ...form, estado: text })}
            />

            <TextInput
              placeholder="Ciudad"
              style={styles.input}
              onChangeText={(text) => setForm({ ...form, ciudad: text })}
            />
            <TextInput
              placeholder="Universidad"
              style={styles.input}
              onChangeText={(text) => setForm({ ...form, universidad: text })}
            />
            <TextInput
              placeholder="Edificio"
              style={styles.input}
              onChangeText={(text) => setForm({ ...form, edificio: text })}
            />
            <TextInput
              placeholder="Aula"
              style={styles.input}
              onChangeText={(text) => setForm({ ...form, aula: text })}
            />

            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
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
                onPress={() => setNewSensor(false)}
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
