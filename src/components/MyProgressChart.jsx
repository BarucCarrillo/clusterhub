import React from 'react';
import { View, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const MyProgressChart = () => {
  const data = {
    labels: ["Swim", "Bike", "Run"], // Etiquetas para cada segmento de progreso
    data: [0.4, 0.6, 0.8] // Valores de progreso para cada segmento (entre 0 y 1)
  };

  return (
    <View>
      <ProgressChart
        data={data}
        width={Dimensions.get('window').width - 30} // from react-native
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 3, // Opcional, por defecto es 3
          barPercentage: 0.5,
        }}
        hideLegend={false}
      />
    </View>
  );
};

export default MyProgressChart;
