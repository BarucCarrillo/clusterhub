import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";

const Home = () => {
  return (
    <>
      <SafeAreaView className="h-full">
        <View style={styles.homeContainer}>
            <Text style={styles.textTittle}>NIVEL DE POLVO Y CONTAMINACIÓN</Text>
            <Text style={styles.textFav}>Favorito <Icon 
                  name='heart'
                  type='font-awesome'
                  color='#317B9B'/></Text>
            <Text style={styles.textInfo}>INFORMACIÓN ADICIONAL</Text>
            <Text style={styles.textRecom}>RECOMENDACIONES</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  textTittle: {
    color: "#317B9B", 
    fontWeight: 'bold', 
    textAlign: 'center',
    fontSize: 32,
  },
  textFav: {
    color: "#317B9B", 
    fontWeight: 'bold', 
    textAlign: 'left',
    marginLeft: 35,
    fontSize: 28,
    marginTop: 15,
  },
  textInfo: {
    color: "#317B9B", 
    fontWeight: 'bold', 
    textAlign: 'center',
    fontSize: 30,
    marginTop: 15,
  },
  textRecom: {
    color: "#317B9B", 
    fontWeight: 'bold', 
    textAlign: 'center',
    fontSize: 30,
    marginTop: 15,
  },
})

export default Home;
