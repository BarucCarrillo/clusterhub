import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import Header from "../../src/components/header";
import CarouselCard from "../../src/components/carouselCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();
  return (
    <>
      <SafeAreaView className="h-full">
        <View>
          <Header title={'Ubicación'}/>
            <Image style={styles.img} source={{uri:'https://img.freepik.com/free-vector/global-warming-concept-illustration_114360-8510.jpg?t=st=1720730993~exp=1720734593~hmac=c75bdc5ff329378c9b8fb51de50dc483bf20e95508a9ce487d3e2c19c5cca884&w=996',}}></Image>
            <Text style={styles.textTittle}>NIVEL DE POLVO Y CONTAMINACIÓN</Text>
            <Text style={styles.textFav}>Favorito 
             
            <Icon
              name='heart'
              type='font-awesome'
              color='#317B9B'
              onPress={() => console.log('hello')} /></Text>
            <Text style={styles.textInfo}>INFORMACIÓN ADICIONAL</Text>
            <Text style={styles.textRecom}>RECOMENDACIONES</Text>
            <View>
              <ScrollView horizontal >
                <CarouselCard/>
              </ScrollView>
            </View>
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
    marginTop: 15,
  },
  textFav: {
    color: "#317B9B", 
    fontWeight: 'bold', 
    textAlign: 'left',
    marginLeft: 35,
    fontSize: 28,
    marginTop: 25,
    marginBottom: 15,
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
  textUbi: {
    color: "#317B9B", 
    fontWeight: 'bold', 
    textAlign: 'center',
    fontSize: 32,
    marginTop: 25,
  },
  img: {
    width: 250,
    height: 250,
    marginTop: 25,
    display: 'flex',
    alignSelf: 'center',
    borderRadius: 140,
  },
})

export default Home;
