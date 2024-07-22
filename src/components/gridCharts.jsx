import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import MyChart from './MyChart';
import MyPieChart from './MyPieChart';
import MyProgressChart from './MyProgressChart';
import MyBarChart from './MyBarChart';


const GridCharts = () => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 35 }}>
        <MyChart/>
        <Text style={styles.text}>NOMBRE</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 35 }}>
        <MyProgressChart/>
        <Text style={styles.text}>NOMBRE</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 35 }}>
        <MyBarChart/>
        <Text style={styles.text}>NOMBRE</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 35 }}>
        <MyPieChart/>
        <Text style={styles.text}>NOMBRE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 24,
    color: "#317B9B",
    marginTop: 25,
  },
});

export default GridCharts;
