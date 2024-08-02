import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/header";
import EditGridCharts from "../../src/components/EditGridCharts";
import { router } from "expo-router";
import CardGrid from "../../src/components/gridWidgets";
import { createDashboard,editWidgetOnDashboard } from "../../lib";
import { useGlobalContext } from "../../context/GlobalProvider";
import { BACKEND_API } from "@env";
import { useLocalSearchParams } from "expo-router";
import { deleteGrafica } from "../../lib";


const editPanel = () => {
  const { id } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const [widgetVisible, setWidgetVisible] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState(new Set());
  const { insertWidgetsInDashboard } = useGlobalContext();
  const [dashboard, setDashboard] = useState(null);
  const [widgets, setWidgets] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    destacado: 0,
    id: user.id,
  });

  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${BACKEND_API}/info_dash_user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Dashboard not found");
      }

      const data = await response.json();
      setDashboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWidgets = async () => {
    try {
      const response = await fetch(`${BACKEND_API}/info_graficas_dash/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Widgets not found");
      }

      const data = await response.json();
      setWidgets(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchWidgets();
  }, [id]);

  const handleWidgetSelect = (id) => {
    setSelectedWidgets((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        if (newSelected.size < 4) {
          newSelected.add(id);
        }
      }
      return newSelected;
    });
  };


  const submit = async () => {
    try {
      const widgetsArray = Array.from(selectedWidgets);
      await insertWidgetsInDashboard(id, widgetsArray);
      setSaveVisible(true);
      router.push("/panel");
    } catch (error) {
      console.log(error + " error");
    }
  };





  const deleteHandle = async (dashboardId, graficaId) => {
    try {
      const response = await deleteGrafica(dashboardId, graficaId);
      if (response.status === "success") {
        fetchWidgets(); // Refresh the widgets after successful deletion
      } else {
        console.log("Error deleting grafica");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(dashboardId, graficaId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Header title={"Editar Panel"} />
        <View style={styles.formContainer}>
          <Text style={styles.text}>Nombre del Panel</Text>
          <TextInput
            placeholder="Titulo"
            style={styles.input}
            value={form.nombre}
            onChangeText={(text) => setForm({ ...form, nombre: text })}
          />
          <Text style={styles.text}>Descripción del Panel</Text>
          <TextInput
            placeholder="Descripción"
            style={styles.input}
            value={form.descripcion}
            onChangeText={(text) => setForm({ ...form, descripcion: text })}
          />
        </View>
        <View>
          <FlatList
            data={widgets}
            keyExtractor={(item) => item.graficas_id}
            renderItem={({ item }) => (
              <EditGridCharts
                handleDelete={deleteHandle}
                id_grafica={item.graficas_id}
                dashboardId={id}
                chartType={item.nombre_grafica.toLowerCase()}
                nombre={item.nombre_grafica}
                values={widgets}
              />
            )}
          />
        </View>
        <View style={styles.btnWidget}>
          <Button
            title="Agregar Nuevo Widget"
            color={"#95D7CA"}
            onPress={() => setWidgetVisible(true)}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={submit}
          >
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
          animationType="slide"
          transparent={true}
          visible={saveVisible}
          onRequestClose={() => setSaveVisible(false)}
        >
          
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Cambios Guardados</Text>
              <Icon
                name="check-circle"
                size={48}
                color="#317B9B"
                onPress={() => router.push("/panel")}
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
          <ScrollView>

          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Selecciona los widgets que deseas que aparezcan en el panel
              </Text>
              <Text style={styles.modalSubtitle}>
                Máximo de 4 widgets
              </Text>
              <CardGrid
                selectedWidgets={selectedWidgets}
                onSelect={handleWidgetSelect}
              />
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
          </ScrollView>

        </Modal>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  formContainer: {
    padding: 15,
  },
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#317B9B",
    marginVertical: 10,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  btnWidget: {
    width: "80%",
    alignSelf: "center",
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 18,
    color: "#95D7CA",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default editPanel;
