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
import { useGlobalContext } from "../../context/GlobalProvider";
import { Card } from "react-native-elements";

const Home = () => {
  const { user } = useGlobalContext();
  return (
    <>
      <SafeAreaView className="h-full">
        <View>
          <Header title={'Ubicación'}/>
            <Image style={styles.img} source={{uri:'https://img.freepik.com/free-vector/global-warming-concept-illustration_114360-8510.jpg?t=st=1720725993~exp=1720734593~hmac=c75bdc5ff329378c9b8fb51de50dc483bf20e95508a9ce487d3e2c19c5cca884&w=996',}}></Image>
            <Text style={styles.textTittle}>NIVEL DE POLVO Y CONTAMINACIÓN</Text>
            <Text style={styles.textFav}>Favorito 
             
            <Icon
              name='heart'
              type='font-awesome'
              color='#317B9B'
              onPress={() => console.log('hello')} /></Text>
            <Text style={styles.textInfo}>INFORMACIÓN ADICIONAL</Text>
            <Text style={styles.textRecom}>RECOMENDACIONES</Text>
            <View style={styles.cardContainer}>
              <ScrollView horizontal 
                          style={styles.scrollCards}
                          showsHorizontalScrollIndicator={false}>
                <Card>
                  <Text style={styles.txtCard}> UTILIZA PROTECTOR SOLAR</Text>
                </Card>
                <Card>
                  <Text style={styles.txtCard}>HAZ USO DE CUBREBOCAS </Text>
                </Card>
                <Card>
                  <Text style={styles.txtCard}>UTILIZA ROPA FRESCA</Text>
                </Card>
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
    fontSize: 30,
    marginTop: 15,
  },
  textFav: {
    color: "#317B9B", 
    fontWeight: 'bold', 
    textAlign: 'left',
    marginLeft: 35,
    fontSize: 25,
    marginTop: 25,
    marginBottom: 15,
  },
  textInfo: {
    color: "#317B9B", 
    fontWeight: 'bold', 
    textAlign: 'center',
    fontSize: 25,
    marginTop: 15,
  },
  textRecom: {
    color: "#317B9B", 
    fontWeight: 'bold', 
    textAlign: 'center',
    fontSize: 25,
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
    width: 200,
    height: 200,
    marginTop: 25,
    display: 'flex',
    alignSelf: 'center',
    borderRadius: 140,
  },
  txtCard: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
    color: "#317B9B",
    position: 'relative',
  },
  cardContainer: {
    height: 150,
  },
  scrollCards: {
    marginLeft: 15,
    marginRight: 15,
  },
})

export default Home;
