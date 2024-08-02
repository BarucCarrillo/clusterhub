import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Función para formatear la hora actual
const formatCurrentTime = () => {
  const now = new Date();
  const day = now.toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short' });
  const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  return `${day} ${time}`;
};

const BazierChart = ({ data, labels }) => {
  // Verificar y manejar si las props están definidas y tienen datos
  if (!data || !labels || !Array.isArray(data) || !Array.isArray(labels) || data.length !== labels.length) {
    return (
      <View>
        <Text className="text-center">Grafica de Bazier </Text>
        <LineChart
          data={{
            labels: ['Data not available'],
            datasets: [
              {
                data: [0]
              }
            ],
            legend: ["Simulated Data"]
          }}
          width={Dimensions.get("window").width - 30}
          height={450}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            },
            propsForHorizontalLabels: {
              fontSize: 10
            },
            propsForVerticalLabels: {
              fontSize: 10,
              fontFamily: 'Arial',
              fontWeight: 'normal',
              color: '#ff0000',
              rotation: -45,
              textAnchor: 'end',
              letterSpacing: 1,
              lineHeight: 14,
              textAlign: 'right'
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          bezier
        />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>No hay datos disponibles</Text>
      </View>
    );
  }

  // Limitar datos a los últimos 10
  const limitedData = data.slice(-10);
  const limitedLabels = labels.slice(-10);

  // Generar etiquetas con la hora actual para cada punto
  const formattedLabels = limitedLabels.map(label => `${label} - ${formatCurrentTime()}`);

  if (formattedLabels.length === 0 || limitedData.length === 0) {
    return <View><Text>No hay datos disponibles</Text></View>;
  }

  return (
    <View>
      <LineChart
        data={{
          labels: formattedLabels,
          datasets: [
            {
              data: limitedData
            }
          ],
          legend: ["Humedad"]
        }}
        width={Dimensions.get("window").width - 30}
        height={450}
        yAxisLabel="%"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          },
          propsForHorizontalLabels: {
            fontSize: 10
          },
          propsForVerticalLabels: {
            fontSize: 10,
            fontFamily: 'Arial',
            fontWeight: 'normal',
            color: '#ff0000',
            rotation: -45,
            textAnchor: 'end',
            letterSpacing: 1,
            lineHeight: 14,
            textAlign: 'right'
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        bezier
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

export default BazierChart;
