import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import MyChart from './MyChart';
import MyPieChart from './MyPieChart';
import MyProgressChart from './MyProgressChart';
import MyBarChart from './MyBarChart';


const GridCharts = () => {
    const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 35 }}>
        <MyChart/>
        <Text style={styles.text}>NOMBRE</Text>
        <View style={{flexDirection: 'row', margin: 10,}}>
            <Button 
                title='Editar'
                color={'#317B9B'}
                onPress={() => setModalVisible(true)}/>
            <View style={{width: 30}}></View>
            <Button 
                title='Eliminar'
                color={'#EF4235'}/>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 35 }}>
        <MyProgressChart/>
        <Text style={styles.text}>NOMBRE</Text>
        <View style={{flexDirection: 'row', margin: 10,}}>
            <Button 
                title='Editar'
                color={'#317B9B'}
                onPress={() => setModalVisible(true)}/>
            <View style={{width: 30}}></View>
            <Button 
                title='Eliminar'
                color={'#EF4235'}/>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 35 }}>
        <MyBarChart/>
        <Text style={styles.text}>NOMBRE</Text>
        <View style={{flexDirection: 'row', margin: 10,}}>
            <Button 
                title='Editar'
                color={'#317B9B'}
                onPress={() => setModalVisible(true)}/>
            <View style={{width: 30}}></View>
            <Button 
                title='Eliminar'
                color={'#EF4235'}/>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 35 }}>
        <MyPieChart/>
        <Text style={styles.text}>NOMBRE</Text>
        <View style={{flexDirection: 'row', margin: 10,}}>
            <Button 
                title='Editar'
                color={'#317B9B'}
                onPress={() => setModalVisible(true)}/>
            <View style={{width: 30}}></View>
            <Button 
                title='Eliminar'
                color={'#EF4235'}/>
        </View>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Nombre del Dashboard</Text>
                    <TextInput style={styles.modalInput} placeholder='Nombre'></TextInput>
                    <Icon
                    name="check-circle"
                    size={48}
                    color="#317B9B"
                    onPress={() => setModalVisible(false)}
                    />
                </View>
            </View>
      </Modal>

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
  modalContainer: {
    flex: 1,
    height: 'auto',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 350,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalInput: {
    marginLeft: 15,
    fontSize: 20,
    marginBottom: 20,
  },
});

export default GridCharts;
