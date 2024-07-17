
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const data = [
  { id: '1', title: 'Card 1' },
  { id: '2', title: 'Card 2' },
  { id: '3', title: 'Card 3' },
  { id: '4', title: 'Card 4' },
];

const Card = ({ title }) => (
  <View style={styles.card}>
    <Text style={styles.cardText}>{title}</Text>
  </View>
);

const CardGrid = () => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Card title={item.title} />}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#1976D2',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 130,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default CardGrid;
