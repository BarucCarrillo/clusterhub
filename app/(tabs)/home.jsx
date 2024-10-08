import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import Header from "../../src/components/header";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Card } from "react-native-elements";
import { getRecomendations } from "../../lib";

const Home = () => {
  const { user } = useGlobalContext();
  

  const [recomendations, setRecomendations] = useState(null);

  useEffect(() => {
    const fetchRecomendations = async () => {
      try {
        const result = await getRecomendations(user.id); // Reemplaza el 9 con el ID de usuario correcto
        setRecomendations(result);
      } catch (error) {
        console.error("Error al obtener las recomendaciones:", error);
      }
    };

    fetchRecomendations();
  }
  , []);


  console.log(recomendations);


  if (!recomendations) {
    return (
      <SafeAreaView>
        <View>
          <Header title="Cargando..." />
        </View>
      </SafeAreaView>
    );
  }


  return (
    <>
      <SafeAreaView className="h-full">
        <View>
          <Header title={recomendations.titulo}/>
            <Image style={styles.img} source={{uri:'https://img.freepik.com/free-vector/global-warming-concept-illustration_114360-8510.jpg?t=st=1720725993~exp=1720734593~hmac=c75bdc5ff329378c9b8fb51de50dc483bf20e95508a9ce487d3e2c19c5cca884&w=996',}}></Image>

            <Text style={styles.textRecom}>RECOMENDACIONES</Text>
            <Text style={styles.textRecom}> {recomendations.Descripcion} </Text>
            <View style={styles.cardContainer}>
              <ScrollView horizontal 
                          style={styles.scrollCards}
                          showsHorizontalScrollIndicator={false}>
                <Card containerStyle={styles.card}>
                  <View style={styles.container}>
                    <Image
                      source={{ uri: recomendations.url1 }} // Replace with your image URL or local image source
                      style={styles.image}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>{recomendations.recomendacion1}</Text>
                    </View>
                  </View>
                </Card>
                <Card containerStyle={styles.card}>
                  <View style={styles.container}>
                    <Image
                      source={{ uri: recomendations.url2 }} // Replace with your image URL or local image source
                      style={styles.image}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>{recomendations.recomendacion2}</Text>
                    </View>
                  </View>
                </Card>
                <Card containerStyle={styles.card}>
                  <View style={styles.container}>
                    <Image
                      source={{ uri: recomendations.url3 }} // Replace with your image URL or local image source
                      style={styles.image}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>{recomendations.recomendacion3}</Text>
                    </View>
                  </View>
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
  cardContainer: {
    marginTop: 20,
  },
  scrollCards: {
    paddingLeft: 5,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    width: "30%", // Adjust width as needed
    marginRight: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '40%',
    height: 100,
  },
  textContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: "#317B9B",
    fontWeight: '900'
  },
});

export default Home;
