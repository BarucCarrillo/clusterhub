import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Función para formatear la fecha
const formatCurrentTime = () => {
  const now = new Date();
  const day = now.toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short' });
  const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  return `${day} ${time}`;
};

const MyChart = ({ data, labels }) => {
  // Verificar y manejar si las props están definidas y tienen datos
  if (!data || !labels || !Array.isArray(data) || !Array.isArray(labels) || data.length !== labels.length) {
    return (
      <View>
        <Text className="text-center">Grafica de Linea </Text>
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
          height={270}
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
        />
      </View>
    );
  }

  // Manejo de valores nulos en los datos y etiquetas
  const safeData = data.map(value => (value != null ? value : 0)); // Reemplaza null con 0
  const safeLabels = labels.map(label => (label != null ? label : 'Sin etiqueta')); // Reemplaza null con texto predeterminado

  // Limitar datos a los últimos 10
  const limitedData = safeData.slice(-10);
  const limitedLabels = safeLabels.slice(-10);

  // Generar etiquetas con la hora actual para cada punto
  const formattedLabels = limitedLabels.map(label => `${label} - ${formatCurrentTime()}`);

  if (formattedLabels.length === 0 || limitedData.length === 0) {
    return <View><Text>No hay datos disponibles</Text></View>;
  }

  // Filtrar etiquetas y datos para mostrar solo uno de cada n
  const step = Math.ceil(formattedLabels.length / 10); // Ajusta el divisor según la cantidad deseada
  const filteredLabels = formattedLabels.filter((_, index) => index % step === 0);
  const filteredData = limitedData.filter((_, index) => index % step === 0);

  return (
    <View>
      <LineChart
        data={{
          labels: filteredLabels,
          datasets: [
            {
              data: filteredData
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

export default MyChart;
