import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/header";
import GridCharts from "../../src/components/gridCharts";
import { Icon } from "react-native-elements";
import { useLocalSearchParams } from "expo-router";
import { BACKEND_API } from "@env";
import {
  getSensorUser,
  assingSensorToWidget,
  deleteSensorFromWidget,
  updateSensorInWidget,
} from "../../lib/index";
import RNPickerSelect from "react-native-picker-select";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useNavigation } from "@react-navigation/native";

const ViewDash = () => {
  const { id } = useLocalSearchParams();
  const [shareVisible, setShareVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [widgetSelect, setWidgetSelect] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [pickerItems, setPickerItems] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [componentKey, setComponentKey] = useState(0); // Clave para forzar recarga
  const [refreshing, setRefreshing] = useState(false);
  const [sensorData, setSensorData] = useState(null);
  const [modalSensor, setModalSensor] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [sensorToEdit, setSensorToEdit] = useState(null); // Estado para el sensor seleccionado para editar
  const [sensorGraphId, setSensorGraphId] = useState(null); // Estado para el ID del sensor grá

  const { user } = useGlobalContext();
  const user_id = user.id;
  const navigation = useNavigation();
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchWidgets();
      // Puedes llamar a fetchDashboard() si necesitas actualizar también el dashboard
    } catch (error) {
      console.log("Error refreshing data:", error.message);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${BACKEND_API}/info_dash_user/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Dashboard not found");
      }
      const data = await response.json();
      console.log("Dashboard Data:", data); // Verificar la estructura de la respuesta
      if (Array.isArray(data) && data.length > 0) {
        setDashboard(data[0]);
      } else {
        setDashboard(null);
      }
    } catch (error) {
      console.log("Error fetching dashboard:", error.message);
    }
  };

  const fetchSensor = async () => {
    try {
      const response = await getSensorUser(user_id);
      const formattedItems = response.map((sensor) => ({
        label: sensor.nombre_sensor,
        value: sensor.id_sensor,
      }));
      setPickerItems(formattedItems);
    } catch (error) {
      console.log("Error fetching sensors:", error.message);
    }
  };

  const fetchWidgets = async () => {
    try {
      const response = await fetch(`${BACKEND_API}/info_graficas_dash/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Widgets not found");
      }
      const data = await response.json();
      const formattedItems = data.map((widget) => ({
        label: widget.nombre_grafica,
        value: widget.id_dashboard_graficas,
      }));
      setWidgets(data);
      setWidgetSelect(formattedItems);
    } catch (error) {
      console.log("Error fetching widgets:", error.message);
    }
  };

  const handleSensor = async (sensor_id, widget_id) => {
    try {
      if (!sensor_id || !widget_id) {
        throw new Error("Sensor or widget ID is missing");
      }
      await assingSensorToWidget(sensor_id, widget_id);
      setModalVisible(false);
      setSuccess(true);
      setComponentKey((prevKey) => prevKey + 1); // Forzar recarga cambiando la clave
    } catch (error) {
      console.log("Error assigning sensor:", error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchWidgets();
    const interval = setInterval(() => {
      fetchWidgets();
    }, 3000);
    return () => clearInterval(interval);
  }, [id, user_id, componentKey]); // Añadir `componentKey` a las dependencias

  useEffect(() => {
    fetchSensor();
  }, [user_id]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // console.log(dashboard);

  const fetchSensorData = async (sensor_id) => {
    try {
      const response = await fetch(
        `${BACKEND_API}/sensor_grafica/${sensor_id}`
      );
      console.log("Sensor Data Response:", response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Sensor data not found");
      }
      const data = await response.json();
      setSensorData(data);
      setModalSensor(true);
    } catch (error) {
      console.log("Error fetching sensor data:", error.message);
    }
  };

  const handleSensorDelete = async (sensor_id, widget_id) => {
    try {
      if (!sensor_id || !widget_id) {
        throw new Error("Sensor or widget ID is missing");
      }
      await deleteSensorFromWidget(sensor_id, widget_id);
      setModalSensor(false);
      setSuccess(true);
      setComponentKey((prevKey) => prevKey + 1); // Forzar recarga cambiando la clave
    } catch (error) {
      console.log("Error assigning sensor:", error.message);
    }
  };

  const handleSensorUpdate = async () => {
    try {
      if (!selectedSensor || !sensorGraphId) {
        throw new Error("Sensor or widget ID is missing");
      }
      await updateSensorInWidget(sensorGraphId, selectedSensor);
      setModalSensor(false);
      setModalEdit(false);
      setSensorGraphId(null);
      setSensorToEdit(null);
      setComponentKey((prevKey) => prevKey + 1); // Forzar recarga cambiando la clave
    } catch (error) {
      console.log("Error updating sensor:", error.message);
    }
  };

  // console.log(sensorGraphId);

  const handleEditSensor = (sensor_id, sensor_graph_id) => {
    setSensorToEdit(sensor_id);
    setSensorGraphId(sensor_graph_id); // Guardar el ID del sensor gráfico
    setModalEdit(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} key={componentKey}>
      {dashboard ? (
        <Header title={`Bienvenido al panel : ${dashboard.nombre_dashboard}`} />
      ) : (
        <Text>Cargando...</Text>
      )}
      <FlatList
        data={widgets}
        keyExtractor={(item) => item.id_dashboard_graficas.toString()}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              className=""
              onPress={() => fetchSensorData(item.id_dashboard_graficas)}
            >
              <GridCharts
                grafica_id={item.id_dashboard_graficas}
                chartType={item.nombre_grafica.toLowerCase()}
              />
            </TouchableOpacity>
          </>
        )}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <Text style={styles.shareText}>Compartir</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text>Añadir sensor</Text>
            </TouchableOpacity>
            <Icon
              raised
              name="share"
              type="font-awesome"
              color="#317B9B"
              onPress={() => setShareVisible(true)}
            />
          </View>
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Selecciona el sensor que deseas añadir
            </Text>
            <Text>Elige un sensor</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedSensor(value)}
              items={pickerItems}
              placeholder={{ label: "Selecciona un sensor...", value: null }}
            />
            <Text>Elige una gráfica</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedWidget(value)}
              items={widgetSelect}
              placeholder={{ label: "Selecciona una gráfica...", value: null }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleSensor(selectedSensor, selectedWidget)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={shareVisible}
        onRequestClose={() => setShareVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Comparte tu Dashboard</Text>
            <View style={styles.modalIcon}>
              <Icon
                name="facebook"
                size={48}
                color="#317B9B"
                style={styles.icon}
              />
              <View style={{ width: 50 }}></View>
              <Icon
                name="message"
                size={48}
                color="#317B9B"
                style={styles.icon}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={success}
        onRequestClose={() => setSuccess(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Operacion realizada con exito</Text>
            <View style={styles.modalIcon}>
              <Icon
                name="check"
                size={48}
                color="#317B9B"
                style={styles.icon}
                onPress={() => setSuccess(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSensor}
        onRequestClose={() => setModalSensor(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Información sensor</Text>
            <FlatList
              data={sensorData}
              keyExtractor={(item) => item.id_sensor_grafica.toString()}
              renderItem={({ item }) => (
                <View className="flex flex-col">
                  <Text className="m-5">
                    Nombre del sensor: <Text className="font-semibold text-xl">{item.nombre_sensor}</Text>{" "}
                  </Text>
                  <View className="flex flex-row gap-2">
                    <TouchableOpacity
                      onPress={() =>
                        handleSensorDelete(
                          item.sensor_id,
                          item.dashboard_graficas_id
                        )
                      }
                      style={[styles.button, styles.cancelButton]}
                    >
                      <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        handleEditSensor(item.sensor_id, item.id_sensor_grafica)
                      }
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEdit}
        onRequestClose={() => setModalEdit(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>cambiar sensores</Text>
            <FlatList
              data={sensorData}
              keyExtractor={(item) => item.id_sensor_grafica.toString()}
              renderItem={({ item }) => (
                <>
                  <Text>{item.nombre_sensor}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      handleSensorDelete(
                        item.sensor_id,
                        item.dashboard_graficas_id
                      )
                    }
                    style={styles.button}
                  >
                    <Text>Eliminar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalEdit(true)}
                    style={styles.button}
                  >
                    <Text>Editar</Text>
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEdit}
        onRequestClose={() => setModalEdit(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar sensor en el widget</Text>
            <Text>Selecciona el sensor</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedSensor(value)}
              items={pickerItems}
              placeholder={{ label: "Selecciona un sensor...", value: null }}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSensorUpdate}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalEdit(false)}
                style={[styles.button, styles.cancelButton]}
              >
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
  footerContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  shareText: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#317B9B",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#317B9B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#E53935",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalIcon: {
    flexDirection: "row",
    marginTop: 20,
  },
  icon: {
    marginHorizontal: 20,
  },buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default ViewDash;
