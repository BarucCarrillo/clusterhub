import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';

// Datos simulados
const simulatedData = {
  labels: ["Aula 1", "Aula 2", "Aula 3", "Aula 4", "Aula 5"],
  legend: ["Sensor 1", "Sensor 2", "Sensor 3"],
  data: [
    [10, 20, 30, 40, 50],  // Datos para Sensor 1
    [15, 25, 35, 45, 55],  // Datos para Sensor 2
    [20, 30, 40, 50, 60]   // Datos para Sensor 3
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"] // Colores claros
};

const StackedChart = ({ data, labels, aula }) => {
  // Verificar si los datos están vacíos
  const isDataEmpty = !data || data.length === 0;
  const isLabelsEmpty = !labels || labels.length === 0;
  const isAulaEmpty = !aula || aula.length === 0;

  if (isDataEmpty || isLabelsEmpty || isAulaEmpty) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", height: 220 }}>
        <Text>
          No hay datos disponibles, mostrando datos simulados, es posible que aun no tenga asignado un sensor.
        </Text>
        <StackedBarChart
          data={simulatedData}
          width={Dimensions.get('window').width - 30}
          height={220}
          style={{ borderRadius: 10 }}
          chartConfig={{
            backgroundGradientFrom: "#f5f5f5",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#ffffff",
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(49, 123, 155, ${opacity})`,
            strokeWidth: 3,
            barPercentage: 0.5,
            useShadowColorFromDataset: false
          }}
          verticalLabelRotation={30}
        />
      </View>
    );
  }

  // Crear un mapa de datos para los sensores
  const sensorDataMap = {};
  labels.forEach((sensor, index) => {
    if (!sensorDataMap[sensor]) {
      sensorDataMap[sensor] = [];
    }
    sensorDataMap[sensor][aula[index]] = data[index];
  });

  const uniqueAulas = Array.from(new Set(aula)).slice(0, 5);

  const transformedData = {
    labels: uniqueAulas,
    legend: Object.keys(sensorDataMap),
    data: Object.keys(sensorDataMap).map(sensor => {
      return uniqueAulas.map(aula => sensorDataMap[sensor][aula] || 0);
    }),
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
  };

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 16, color: '#333' }}>Stacked Bar Chart</Text>
      <StackedBarChart
        data={transformedData}
        width={Dimensions.get('window').width - 30}
        height={220}
        style={{ borderRadius: 10 }}
        chartConfig={{
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#ffffff",
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(49, 123, 155, ${opacity})`,
          strokeWidth: 3,
          barPercentage: 0.5,
          useShadowColorFromDataset: false
        }}
        verticalLabelRotation={30}
      />
    </View>
  );
};

export default StackedChart;
