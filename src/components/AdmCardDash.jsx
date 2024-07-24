import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from "expo-router";

const AdmCardDash = ({ title, description, image }) => {
  return (
    <View className=" pl-4 pr-4 overflow-hidden  mb-5">
      <View className="bg-white rounded-lg  p-4 h-[180px] w-full shadow-lg ">
        <Text className="text-secondary font-semibold text-2xl ml-2">{title}</Text>
        <View className="flex flex-row justify-between items-center ">
          <Text className="text-md text-[#868686] flex-shrink">{description}</Text>
          <Image className="w-[50px] h-[50px] " source={image}
          resizeMode='contain'
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/editPanel')}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.button]}
            //onPress={() => router.push("panel")}
          >
            <Text style={styles.buttonText}>Borrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: "center",
      marginTop: 10,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#317B9B",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      margin: 10,
    },
    buttonText: {
      color: "#F5F5F5",
      fontSize: 16,
    },
  });

export default AdmCardDash;