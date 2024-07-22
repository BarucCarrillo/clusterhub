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
import Header from "../../src/components/header";
import { Card, Icon } from "react-native-elements";
import { Table, Row, Rows } from "react-native-table-component";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getCiudadEstadoById,
  getPais,
  getEstadoPaisById,
  getUniversidadCiudadById,
  getUniversidadEdificioById,
  getEdificioAulaById,
  getTypeSensor,
  crearSensor,
  getSensorUser,
  deleteSensor,
} from "../../lib";
import CustomButton from "../../src/components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import RNPickerSelect from "react-native-picker-select";

const adminSensor = () => {
  const { user, loading } = useGlobalContext();

  const id = user.id;
  const [ciudad, setCiudad] = useState([]);
  const [pais, setPais] = useState([]);
  const [estado, setEstado] = useState([]);
  const [universidad, setUniversidad] = useState([]);
  const [edificio, setEdificio] = useState([]);
  const [tipo_sensor, setTipo_sensor] = useState([]);

  const [aula, setAula] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    tipo_sensor: "",
    aula_id: "",
    user_id: id,
    topic: "",
  });
  
  const [selectedPais, setSelectedPais] = useState(null);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [selectedCiudad, setSelectedCiudad] = useState(null);
  const [selectedUniversidad, setSelectedUniversidad] = useState(null);
  const [selectedEdificio, setSelectedEdificio] = useState(null);
  const [sensor, setSensor] = useState([]);
  const [selectedAula, setSelectedAula] = useState(null);

  // Fetch functions

  const fetchTypeSensor = async () => {
    try {
      const response = await getTypeSensor();
      setTipo_sensor(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSensorUser = async () => {
    try {
      const response = await getSensorUser(id);
      setSensor(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchPais = async () => {
    try {
      const response = await getPais();
      setPais(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchEstadoPais = async (id) => {
    try {
      const response = await getEstadoPaisById(id);
      setEstado(response);
      setSelectedEstado(null); // Reset state
      setCiudad([]); // Clear city list
      setUniversidad([]); // Clear university list
      setEdificio([]); // Clear building list
      setAula([]); // Clear classroom list
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCiudadEstado = async (id) => {
    try {
      const response = await getCiudadEstadoById(id);
      setCiudad(response);
      setSelectedCiudad(null); // Reset city
      setUniversidad([]); // Clear university list
      setEdificio([]); // Clear building list
      setAula([]); // Clear classroom list
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUniversidadCiudad = async (id) => {
    try {
      const response = await getUniversidadCiudadById(id);
      setUniversidad(response);
      setSelectedUniversidad(null); // Reset university
      setEdificio([]); // Clear building list
      setAula([]); // Clear classroom list
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchEdificioUniversidad = async (id) => {
    try {
      const response = await getUniversidadEdificioById(id);
      setEdificio(response);
      setSelectedEdificio(null); // Reset building
      setAula([]); // Clear classroom list
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAula = async (id) => {
    try {
      const response = await getEdificioAulaById(id);
      setAula(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPais();
    fetchTypeSensor();
    fetchSensorUser();
  }, []);

  useEffect(() => {
    if (selectedPais) {
      fetchEstadoPais(selectedPais);
    }
  }, [selectedPais]);

  useEffect(() => {
    if (selectedEstado) {
      fetchCiudadEstado(selectedEstado);
    }
  }, [selectedEstado]);

  useEffect(() => {
    if (selectedCiudad) {
      fetchUniversidadCiudad(selectedCiudad);
    }
  }, [selectedCiudad]);

  useEffect(() => {
    if (selectedUniversidad) {
      fetchEdificioUniversidad(selectedUniversidad);
    }
  }, [selectedUniversidad]);

  useEffect(() => {
    if (selectedEdificio) {
      fetchAula(selectedEdificio);
    }
  }, [selectedEdificio]);

  const handleAulaChange = (value) => {
    setSelectedAula(value);
    setForm((prevForm) => ({
      ...prevForm,
      aula_id: value,
    }));
  };

  const header = ["Aula", "Usuario", "Topic", "Ciudad"];
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

  const dataVoid = [
    [
      <>
        <RNPickerSelect
          onValueChange={(value) => setSelectedPais(value)}
          placeholder={{ label: "Seleccione un país", value: null }}
          items={pais.map((item) => ({
            label: item.nombre_pais,
            value: item.id_pais,
          }))}
        />
        <RNPickerSelect
          onValueChange={(value) => setSelectedEstado(value)}
          placeholder={{ label: "Seleccione un estado", value: null }}
          items={estado.map((item) => ({
            label: item.nombre_estado,
            value: item.id_estado,
          }))}
          disabled={!selectedPais}
        />
        <RNPickerSelect
          onValueChange={(value) => setSelectedCiudad(value)}
          placeholder={{ label: "Seleccione una ciudad", value: null }}
          items={ciudad.map((item) => ({
            label: item.nombre_ciudad,
            value: item.id_ciudad,
          }))}
          disabled={!selectedEstado}
        />
        <RNPickerSelect
          onValueChange={(value) => setSelectedUniversidad(value)}
          placeholder={{ label: "Seleccione una universidad", value: null }}
          items={universidad.map((item) => ({
            label: item.nombre_universidad,
            value: item.id_universidad,
          }))}
          disabled={!selectedCiudad}
        />
        <RNPickerSelect
          onValueChange={(value) => setSelectedEdificio(value)}
          placeholder={{ label: "Seleccione un edificio", value: null }}
          items={edificio.map((item) => ({
            label: item.nombre_edificio,
            value: item.id_edificio,
          }))}
          disabled={!selectedUniversidad}
        />
        <RNPickerSelect
          onValueChange={handleAulaChange}
          placeholder={{ label: "Seleccione un aula", value: null }}
          items={aula.map((item) => ({
            label: item.nombre_aula,
            value: item.id_aula,
          }))}
          disabled={!selectedEdificio}
        />
      </>,
    ],
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSave, setModalSave] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [newSensor, setNewSensor] = useState(null);

  return (
    <SafeAreaView className="flex-1">
      <LoadingScreen
  isLoading={loading}
  />
      <Header title={"Administrar Sensores"} />

      <FlatList
        keyExtractor={(item) => item.id_sensor}
        className="px-4 mb-10"
        data={sensor}
        renderItem={({ item }) => {
          return (
            <>
              <Card containerStyle={{ height: "auto", borderRadius: 5 }}>
                <Text style={styles.title}>Nombre:{item.nombre_sensor}</Text>
                <Text style={styles.subtitle}>
                  Tipo sensor: {item.tipo_sensor}
                </Text>
                <View>
                  <Text>Aula: {item.nombre_aula}</Text>
                  <Text>Usuario: {item.correo}</Text>
                  <Text>Topic: {item.topic}</Text>
                  <Text>Ciudad: {item.nombre_ciudad}</Text>
                  <Text>Universidad: {item.nombre_universidad}</Text>
                  <Text>Edificio: {item.nombre_edificio}</Text>
                  <Text>Fecha de creación: {item.fecha}</Text>
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setSelectedSensor(item);
                      setModalVisible(true)
                    }}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedSensor(item);
                      setModalSave(true);

                    }}
                    style={[styles.button, styles.cancelButton]}
                  >
                    <Text style={styles.buttonText}>
                      Eliminar
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
              <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible && selectedSensor?.id_sensor === item.id_sensor}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className="text-lg text-secondary font-semibold text-center">
              Editar el sensor {item.nombre_sensor}
            </Text>
            <TextInput
              defaultValue={item.nombre_sensor}
              placeholder="Nombre del Sensor"
              onChangeText={(text) => setForm({ ...form, nombre: text })}
              style={styles.input}
            ></TextInput>
              <RNPickerSelect
              onValueChange={(value) =>
                setForm({ ...form, tipo_sensor: value })
              }
              placeholder={{
                label: "Seleccione un tipo de sensor",
                value: null,
              }}
              items={tipo_sensor.map((item) => ({
                label: item.nombre_tipo_sensor,
                value: item.id_tipo_sensor,
              }))}
            />
            <Table>
              <Row
                textStyle={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 18,
                }}
                data={header}
              />
               <RNPickerSelect
               defaultValue={item.id_pais}
          onValueChange={(value) => setSelectedPais(value)}
          placeholder={{ label: "Seleccione un país", value: null }}
          items={pais.map((item) => ({
            label: item.nombre_pais,
            value: item.id_pais,
          }))}
        />
        <RNPickerSelect
          defaultValue={item.id_estado}
          onValueChange={(value) => setSelectedEstado(value)}
          placeholder={{ label: "Seleccione un estado", value: null }}
          items={estado.map((item) => ({
            label: item.nombre_estado,
            value: item.id_estado,
          }))}
          disabled={!selectedPais}
        />
        <RNPickerSelect
          defaultValue={item.id_ciudad}
          onValueChange={(value) => setSelectedCiudad(value)}
          placeholder={{ label: "Seleccione una ciudad", value: null }}
          items={ciudad.map((item) => ({
            label: item.nombre_ciudad,
            value: item.id_ciudad,
          }))}
          disabled={!selectedEstado}
        />
        <RNPickerSelect
          defaultValue={item.id_universidad}
          onValueChange={(value) => setSelectedUniversidad(value)}
          placeholder={{ label: "Seleccione una universidad", value: null }}
          items={universidad.map((item) => ({
            label: item.nombre_universidad,
            value: item.id_universidad,
          }))}
          disabled={!selectedCiudad}
        />
        <RNPickerSelect
          defaultValue={item.id_edificio}
          onValueChange={(value) => setSelectedEdificio(value)}
          placeholder={{ label: "Seleccione un edificio", value: null }}
          items={edificio.map((item) => ({
            label: item.nombre_edificio,
            value: item.id_edificio,
          }))}
          disabled={!selectedUniversidad}
        />
        <RNPickerSelect
          defaultValue={item.id_aula}
          onValueChange={handleAulaChange}
          placeholder={{ label: "Seleccione un aula", value: null }}
          items={aula.map((item) => ({
            label: item.nombre_aula,
            value: item.id_aula,
          }))}
          disabled={!selectedEdificio}
        />
              
            </Table>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
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
            <RNPickerSelect
              onValueChange={(value) =>
                setForm({ ...form, tipo_sensor: value })
              }
              placeholder={{
                label: "Seleccione un tipo de sensor",
                value: null,
              }}
              items={tipo_sensor.map((item) => ({
                label: item.nombre_tipo_sensor,
                value: item.id_tipo_sensor,
              }))}
            />
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
              <TouchableOpacity style={styles.button} onPress={handleSave}>
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
        title="Agregar panel"
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
            <RNPickerSelect
              onValueChange={(value) =>
                setForm({ ...form, tipo_sensor: value })
              }
              placeholder={{
                label: "Seleccione un tipo de sensor",
                value: null,
              }}
              items={tipo_sensor.map((item) => ({
                label: item.nombre_tipo_sensor,
                value: item.id_tipo_sensor,
              }))}
            />
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
              <TouchableOpacity style={styles.button} onPress={handleSave}>
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
