import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const GridCharts = () => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={{ uri: 'https://via.placeholder.com/180' }}
          style={styles.mainImage}
        />
        <Text>NOMBRE</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.image}
          />
          <Text>Texto 1</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.image}
          />
          <Text>Texto 2</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={{ uri: 'https://via.placeholder.com/180' }}
          style={styles.mainImage}
        />
        <Text>NOMBRE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  mainImage: {
    width: 180,
    height: 180,
    margin: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GridCharts;
