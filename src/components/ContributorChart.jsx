import { View, Text,Dimensions  } from 'react-native';
import React from 'react';
import { ContributionGraph } from 'react-native-chart-kit';

// Función para formatear la fecha en el formato esperado por ContributionGraph
const formatDate = (date) => {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0'); // Mes en formato de dos dígitos
  const dd = String(d.getDate()).padStart(2, '0'); // Día en formato de dos dígitos
  return `${yyyy}-${mm}-${dd}`;
};

const ContributorChart = ({ date, labels, data, aula }) => {
  console.log("data", data);
  console.log("date", date);
  console.log("label", labels);
  console.log("aula", aula);

  // Validación de datos
  if (!data || !date || !labels || !aula || !Array.isArray(data) || !Array.isArray(date) || !Array.isArray(labels) || !Array.isArray(aula) || data.length !== date.length || data.length !== labels.length || data.length !== aula.length) {
    return (
      <View>
        <Text>No hay datos disponibles.</Text>
      </View>
    );
  }

  // Transformar los datos en el formato esperado por ContributionGraph
  const commitsData = data.map((value, index) => ({
    date: formatDate(date[index]),
    count: value
  }));

  return (
    <View>
      <ContributionGraph
        values={commitsData}
        endDate={new Date(Math.max(...date.map(d => new Date(d).getTime())))}
        numDays={105}
        width={Dimensions.get('window').width - 30} // Ajustar el ancho del gráfico
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#08130D",
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(49, 123, 155, ${opacity})`,
          strokeWidth: 2,
          barPercentage: 0.5,
          useShadowColorFromDataset: false
        }}
      />
    </View>
  );
};

export default ContributorChart;
