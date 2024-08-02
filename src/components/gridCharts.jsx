import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MyChart from "./MyChart";
import MyPieChart from "./MyPieChart";
import MyProgressChart from "./MyProgressChart";
import MyBarChart from "./MyBarChart";
import BazierChart from "./BazierChart";
import StackedChart from "./StackedChart";
import { BACKEND_API } from "@env";
import ContributorChart from "./ContributorChart";

const GridCharts = ({ chartType, grafica_id }) => {
  const [widgetData, setWidgetData] = useState([]);

  const fetchWidgetData = async () => {
    try {
      const response = await fetch(
        `${BACKEND_API}/info_graficas_dash_sensor_data/${grafica_id}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Widget data not found");
      }
      const data = await response.json();

      // Mapea los datos para obtener las props necesarias
      const mappedData = data.map((item) => ({
        date: item.fecha || new Date().toISOString(), // Usar fecha actual si no está disponible
        label: item.nombre_sensor || "Sin Nombre",
        data: item.data || 0, // Establecer valor 0 si no hay datos
        aula: item.aula || "Sin Aula",
      }));

      setWidgetData(mappedData);
    } catch (error) {
      console.log(error);
      // Manejo de errores si es necesario
      setWidgetData([]); // Establecer datos vacíos en caso de error
    }
  };

  useEffect(() => {
    fetchWidgetData();
  }, [grafica_id]);

  const getChartPros = () => {
    const labels = widgetData.map((item) => item.label);
    const data = widgetData.map((item) => item.data);
    const aula = widgetData.map((item) => item.aula);
    const date = widgetData.map((item) => item.date);

    return { labels, data, aula, date };
  };

  const renderChart = () => {
    const chartProps = getChartPros();
    switch (chartType) {
      case "line":
        // return <Text>line</Text>;

      return <MyChart {...chartProps} />;
      case "pie":
        // return <Text>pie</Text>;

      return <MyPieChart {...chartProps} />;
      case "progress":
        // return <Text>Progress</Text>;
      return <MyProgressChart {...chartProps} />;
      case "bar":
        // return <Text>bar</Text>;

      return <MyBarChart {...chartProps} />;
      case "bazier":
        // return <Text>bezier</Text>;

      return <BazierChart {...chartProps} />;
      case "stacked":
        // return <Text>stacked</Text>;

        return <StackedChart {...chartProps} />;
      case "contributor":
        // return <Text>contributor</Text>;

      return <ContributorChart {...chartProps} />;
      default:
        return <Text>No hay gráficas disponibles</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text>Id Gráfica: {grafica_id}</Text>
      <Text style={styles.text}>{chartType.toUpperCase()}</Text>
      <View style={styles.chartContainer}>{renderChart()}</View>
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
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },
});

export default GridCharts;
