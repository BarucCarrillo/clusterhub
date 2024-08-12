import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements"; // Asegúrate de que esto sea correcto

const SensorCard = ({
  nombre,
  tipo,
  aula,
  correo,
  topico,
  ciudad,
  universidad,
  edificio,
  fecha,
  handlePress,
  handleDelete,
}) => {
  return (
    <Card containerStyle={{ height: "auto", borderRadius: 5 }}>
      <Text className="text-center text-3xl font-normal">{nombre}</Text>
      <View className="p-2">
        
        <Text className="text-lg font-normal">Tipo sensor: {tipo}</Text>
        <Text className="text-lg font-normal">Correo: {correo}</Text>
        <Text className="text-lg font-normal">Aula: {aula}</Text>
        <Text className="text-lg font-normal">Topic: {topico}</Text>
        <Text className="text-lg font-normal">Ciudad: {ciudad}</Text>
        <Text className="text-lg font-normal">Universidad: {universidad}</Text>
        <Text className="text-lg font-normal">Edificio: {edificio}</Text>
        <Text className="text-lg font-normal">Fecha de creación: {fecha}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </Card>
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
    alignItems: "flex-start", // Cambiado a flex-start
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

export default SensorCard;
