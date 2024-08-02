import React from "react";
import { View, Dimensions, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

// Función para formatear la hora actual
const formatCurrentTime = () => {
  const now = new Date();
  const day = now.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const time = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day} ${time}`;
};

const MyBarChart = ({ data, labels }) => {
  // console.log(data);
  const chartConfig2 = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(49, 123, 155, ${opacity})`,
    strokeWidth: 2, // opcional, por defecto 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // opcional
  };
  const bar = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  // Verificar y manejar si las props están definidas y tienen datos
  if (
    !data ||
    !labels ||
    !Array.isArray(data) ||
    !Array.isArray(labels) ||
    data.length !== labels.length
  ) {
    return (
      <View>
        <Text className="text-center">Grafica de barras</Text>
        <BarChart
          data={bar}
          width={Dimensions.get("window").width - 20}
          height={270}
          yAxisLabel="$"
          chartConfig={chartConfig2}
          verticalLabelRotation={30}
        />
        <Text className="text-center">Datos no disponibles</Text>
      </View>
    );
  }

  // Generar etiquetas con la hora actual para cada punto
  const formattedLabels = labels.map(() => formatCurrentTime());

  // Filtrar etiquetas y datos para mostrar solo uno de cada n
  const step = Math.ceil(formattedLabels.length / 10); // Ajusta el divisor según la cantidad deseada
  const filteredLabels = formattedLabels.filter(
    (_, index) => index % step === 0
  );
  const filteredData = data.filter((_, index) => index % step === 0);

  if (filteredLabels.length === 0 || filteredData.length === 0) {
    return (
      <View>
        <Text>No hay datos disponibles</Text>
      </View>
    );
  }

  const data2 = {
    labels: filteredLabels, // Etiquetas filtradas
    datasets: [
      {
        data: filteredData, // Datos filtrados
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(49, 123, 155, ${opacity})`,
    strokeWidth: 2, // opcional, valor predeterminado 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // opcional
  };

  return (
    <View>
      <BarChart
        data={data2}
        width={Dimensions.get("window").width - 20} // desde react-native
        height={270}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
};

export default MyBarChart;
