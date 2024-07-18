import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { getWidgets } from "../../lib";

const Card = ({ title, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[styles.card, isSelected && styles.selectedCard]}
    onPress={onSelect}
  >
    <Text style={styles.cardText}>{title}</Text>
  </TouchableOpacity>
);

const CardGrid = ({ selectedWidgets, onSelect }) => {
  const [data, setData] = useState([]);

  const fetchWidgets = async () => {
    try {
      const response = await getWidgets();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWidgets();
  }, []);

  const handleSelect = (id) => {
    onSelect(id); // Llama a la función de callback pasada por prop
  };

  const renderItem = ({ item }) => (
    <Card
      title={item.nombre_grafica}
      isSelected={selectedWidgets.has(item.id_grafica)}
      onSelect={() => handleSelect(item.id_grafica)}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id_grafica.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1976D2",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: 130,
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  selectedCard: {
    backgroundColor: "#E53935",
  },
});

export default CardGrid;
