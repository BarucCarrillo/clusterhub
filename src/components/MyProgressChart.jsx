import React from "react";
import { View, Dimensions, Text } from "react-native";
import { ProgressChart, PieChart } from "react-native-chart-kit";

// Normaliza los datos
const normalizeData = (data, maxValue) => data.map((value) => value / maxValue);

const MyProgressChart = ({ data, labels }) => {
  // Verificar datos y etiquetas
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
        style={{ justifyContent: "center", alignItems: "center", height: 220 }}
      >
        <Text>
          Grafica de Progreso
        </Text>
      
      </View>
    );
  }

  // Eliminar duplicados en las etiquetas
  const uniqueLabels = [...new Set(labels)];

  // Agrupar datos por sensor y calcular el promedio si hay múltiples entradas
  const groupedData = uniqueLabels.map((label) => {
    const indices = labels
      .map((item, index) => (item === label ? index : -1))
      .filter((index) => index !== -1);
    const sum = indices.reduce((acc, index) => acc + data[index], 0);
    return sum / indices.length;
  });

  const maxDataValue = 100; // Valor máximo para la normalización

  const progressData = {
    labels: uniqueLabels, // Etiquetas únicas
    data: normalizeData(groupedData, maxDataValue), // Datos normalizados
  };

  return (
    <View>
      <ProgressChart
        data={progressData}
        width={Dimensions.get("window").width - 30} // Ajustar el ancho según sea necesario
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 3, // Opcional, por defecto es 3
          barPercentage: 0.5,
        }}
        hideLegend={false}
      />
      {data == 0 && (
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          No hay datos disponibles, mostrando datos simulados, es posible que
          aun no tenga asignado un sensor.
        </Text>
      )}
    </View>
  );
};

export default MyProgressChart;