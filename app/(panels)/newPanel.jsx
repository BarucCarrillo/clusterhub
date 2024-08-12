import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/header";
import { Card, Input } from "react-native-elements";
import CustomButton from "../../src/components/CustomButton";
import { Icon } from "react-native-elements";
import CardGrid from "../../src/components/gridWidgets";
import { createDashboard } from "../../lib";
import { useGlobalContext } from "../../context/GlobalProvider";

const newPanel = () => {
  const { user } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [widgetVisible, setWidgetVisible] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState(new Set());
  const { insertWidgetsInDashboard } = useGlobalContext();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    destacado: 0,
    id: user.id,
  });

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

  const handleCancelWidgets = () => {
    setSelectedWidgets(new Set());
    setWidgetVisible(false);
  };

  const submit = async () => {
    try {
      const response = await createDashboard(form);
      if (response.status === "success") {
        const dashboardId = response.id;
        const widgets = Array.from(selectedWidgets);
        await insertWidgetsInDashboard(dashboardId, widgets);
        setSaveVisible(true);
        router.push("/panel");
      } else {
        console.log("Error al crear el panel");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderSelectedWidget = ({ item }) => (
    <Text style={styles.widgetText}>{item}</Text>
  );

  const getWidgetName = (id) => {
    switch (id) {
      case 1:
        return "Gráfica de Barras";
      case 2:
        return "Gráfica de Pastel";
      case 3:
        return "Gráfica de Líneas";
      case 4:
        return "Gráfica de Progreso";
      case 5:
        return "Gráfica de Bazier";
      case 6:
        return "Gráfica de Stack";
      case 7:
        return "Gráfica de Contributor";
      default:
        return "Widget no encontrado";
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Header title={"Crear Nuevo Panel"} />
        <View style={styles.cardContainer}>
          <Card containerStyle={{ height: 600 }}>
            <Text>Nombre</Text>
            <Input
              value={form.nombre}
              onChangeText={(e) => setForm({ ...form, nombre: e })}
            />
            <Text>Descripción</Text>
            <Input
              value={form.descripcion}
              onChangeText={(e) => setForm({ ...form, descripcion: e })}
            />
            <CustomButton
              containerStyles={"bg-[#317B9B]"}
              textStyles={"text-lg font-semibold text-left mt-2 text-white"}
              title={"Agregar Widget"}
              handlePress={() => setWidgetVisible(true)}
            />
            <Text className="text-center mt-2">Widgets Seleccionados</Text>
            <View>
              {Array.from(selectedWidgets).map((widget) => (
                <Text className="text-center m-2" key={widget.id}>{getWidgetName(widget)}</Text>
              ))}
            </View>
          </Card>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={submit}>
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
            <Icon
              name="check-circle"
              size={48}
              color="#317B9B"
              style={styles.icon}
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
        <ScrollView contentContainerStyle={styles.modalScrollContent}>
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
                  onPress={handleCancelWidgets}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={saveVisible}
        onRequestClose={() => setSaveVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Dashboards Agregados</Text>
            <Icon
              name="check-circle"
              size={48}
              color="#317B9B"
              style={styles.icon}
              onPress={() => setWidgetVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingBottom: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
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
    alignItems: "center",
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center",
  },
  widgetText: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default newPanel;
