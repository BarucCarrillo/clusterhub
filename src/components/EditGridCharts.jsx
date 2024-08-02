import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Modal, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import MyChart from "./MyChart";
import MyPieChart from "./MyPieChart";
import MyProgressChart from "./MyProgressChart";
import MyBarChart from "./MyBarChart";
import RNPickerSelect from "react-native-picker-select";
import BazierChart from "./BazierChart";

const GridCharts = ({
  chartType,
  handleDelete,
  dashboardId,
  id_grafica,
  nombre,
  handleEdit,
  values,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [pickerItems, setPickerItems] = useState([]);

  useEffect(() => {
    if (values && Array.isArray(values)) {
      const formattedItems = values.map((item) => ({
        label: item.nombre_grafica,
        value: item.graficas_id,
      }));
      setPickerItems(formattedItems);
    }
  }, [id_grafica, values]);

  const confirmDelete = async () => {
    await handleDelete(dashboardId, id_grafica);
    setDeleteVisible(false);
  };

  const renderChart = () => {
    console.log(chartType);
    switch (chartType) {
      case "line":
        return <MyChart />;
      case "pie":
        return <MyPieChart />;
      case "progress":
        return <MyProgressChart />;
      case "bar":
        return <MyBarChart />;
      case "bazier":
        return <BazierChart />;
      case "stacked":
        return <MyPieChart />;
      case "contributor":
        return <MyProgressChart />;
      default:
        return <Text>No hay graficas disponible</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 35,
        }}
      >
        {renderChart()}
        <View style={{ flexDirection: "row", margin: 10 }}>
          <Button
            title="Editar"
            color={"#317B9B"}
            onPress={() => setModalVisible(true)}
          />
          <View style={{ width: 30 }}></View>
          <Button
            title="Eliminar"
            color={"#EF4235"}
            onPress={() => setDeleteVisible(true)}
          />
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
            <Text style={styles.modalTitle}>{nombre}</Text>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={pickerItems} // Asegúrate de que 'nombre' tenga el formato esperado para 'RNPickerSelect'
            />
            <Icon
              name="check-circle"
              size={48}
              color="#317B9B"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteVisible}
        onRequestClose={() => setDeleteVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              ¿Desea eliminar el widget? {id_grafica}
            </Text>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                alignSelf: "center",
              }}
            >
              <Icon
                name="check-circle"
                size={48}
                color="#317B9B"
                onPress={confirmDelete}
              />
              <View style={{ width: 30 }}></View>
              <Icon
                name="cancel"
                size={48}
                color="#EF4235"
                onPress={() => setDeleteVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 24,
    color: "#317B9B",
    marginTop: 25,
  },
  modalContainer: {
    flex: 1,
    height: "auto",
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
  modalInput: {
    marginLeft: 15,
    fontSize: 20,
    marginBottom: 20,
  },
});

export default GridCharts;
