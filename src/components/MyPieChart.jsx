import React from "react";
import { View, Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";

// Definir un conjunto de colores fijos
const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

const MyPieChart = ({ data, labels }) => {
  // Verificar si hay datos y etiquetas
  if (
    !data ||
    !labels ||
    !Array.isArray(data) ||
    !Array.isArray(labels) ||
    data.length === 0 ||
    labels.length === 0
  ) {
    const noData = [
      {
        name: "No Data",
        population: 1,
        color: "#E26A00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12,
      },
    ];
    return (
      <View
        style={{ alignItems: "center", justifyContent: "center", height: 220 }}
      >
          <Text>Grafica de pastel</Text>
          <PieChart
          data={noData}
          width={Dimensions.get("window").width - 30} // Ajustar el ancho según sea necesario
          height={300}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        <Text style={{ marginTop: 10 }}>No hay sensores asignados</Text>
      </View>
    );
  }

  // Crear un mapa de colores
  const colorMap = {};

  // Filtrar datos para eliminar valores nulos y duplicados
  const filteredData = labels
    .map((label, index) => ({
      label,
      value: data[index],
    }))
    .filter(
      ({ value }) => value !== null && value !== undefined && value !== 0
    );

  // Eliminar etiquetas duplicadas y asignar colores
  const uniqueLabels = Array.from(
    new Set(filteredData.map(({ label }) => label))
  );
  const pieData = uniqueLabels.map((label, index) => {
    const value = filteredData.find((item) => item.label === label).value;
    return {
      name: label,
      population: value,
      color: COLORS[index % COLORS.length], // Usar colores cíclicamente
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    };
  });

  const fakeData = [
    {
      name: "SIN SENSOR",
      population: 1,
      color: "#FF6384",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "SIN SENSOR",
      population: 1,
      color: "#36A2EB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  // Verificar si hay datos válidos para mostrar
  if (pieData.length === 0) {
    return (
      <View
        className="bg-white rounded shadow-md p-2 m-4"
        style={{ alignItems: "center", justifyContent: "center", height: 220 }}
      >
        <Text>Grafica de pie</Text>
        <Text className="mt-4">No hay datos disponibles</Text>

        <PieChart
          data={fakeData}
          width={Dimensions.get("window").width - 30} // Ajustar el ancho según sea necesario
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    );
  }

  return (
    <View>
      <PieChart
        data={pieData}
        width={Dimensions.get("window").width - 30} // Ajustar el ancho según sea necesario
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute // Mostrar valores absolutos en lugar de porcentajes
      />
    </View>
  );
};

export default MyPieChart;
