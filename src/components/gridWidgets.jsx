import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getWidgets } from "../../lib";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - 40; // Ajusta el ancho del gráfico
const chartHeight = 200; // Ajusta la altura del gráfico

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(49, 123, 155, ${opacity})`,
  strokeWidth: 2, // opcional, por defecto 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // opcional
};

const dataLine = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // opcional
      strokeWidth: 2, // opcional
    },
  ],
  legend: ["Rainy Days"], // opcional
};

const progress = {
  labels: ["Swim", "Bike", "Run"], // opcional
  data: [0.4, 0.6, 0.8]
};

const bar = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

const stacked = {
  labels: ["Test1", "Test2"],
  legend: ["L1", "L2", "L3"],
  data: [
    [60, 60, 60],
    [30, 30, 60]
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
};

const pie = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "New York",
    population: 8538000,
    color: "#000",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

const commitsData = [
  { date: "2017-01-02", count: 1 },
  { date: "2017-01-03", count: 2 },
  { date: "2017-01-04", count: 3 },
  { date: "2017-01-05", count: 4 },
  { date: "2017-01-06", count: 5 },
  { date: "2017-01-30", count: 2 },
  { date: "2017-01-31", count: 3 },
  { date: "2017-03-01", count: 2 },
  { date: "2017-04-02", count: 4 },
  { date: "2017-03-05", count: 2 },
  { date: "2017-02-30", count: 4 }
];

const Card = ({ title, isSelected, onSelect, data }) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onSelect}
    >
      {data === "line" && (
        <LineChart
          data={dataLine}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
        />
      )}
      {data === "bar" && (
        <BarChart
          data={bar}
          width={chartWidth}
          height={chartHeight}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      )}
      {data === "pie" && (
        <PieChart
          data={pie}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}
      {data === "progress" && (
        <ProgressChart
          data={progress}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}

          hideLegend={false}
          strokeWidth={16}
          radius={32}
        />
      )}
      {data === "contributor" && (
        <ContributionGraph
          values={commitsData}
          endDate={new Date("2017-04-01")}
          numDays={105}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
        />
      )}
      {data === "stacked" && (
        <StackedBarChart
          data={stacked}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
        />
      )}
      {data === "bazier" && (
        <LineChart
          data={dataLine}
          width={chartWidth}
          height={chartHeight}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
        />
      )}
    </TouchableOpacity>
  </View>
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
      data={item.nombre_grafica.toLowerCase()}
      isSelected={selectedWidgets.has(item.id_grafica)}
      onSelect={() => handleSelect(item.id_grafica)}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id_grafica.toString()}
      numColumns={1} // Display items in a single column
      
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 8,
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: chartHeight, // Ajusta la altura del gráfico
    width: chartWidth, // Ajusta el ancho del gráfico
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  selectedCard: {
    backgroundColor: "#f0f0f0",
    opacity: 0.5
  },
});

export default CardGrid;
