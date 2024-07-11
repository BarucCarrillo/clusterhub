import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import HomeCardDash from "../../src/components/HomeCardDash";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, svg } from "../../constants";
import CustomButton from "../../src/components/CustomButton";
import Header from "../../src/components/header";
const Panel = () => {
  return (
    <>
      <SafeAreaView

      className="h-full"
      >
        <StatusBar
          barStyle="light-content"
          hidden={false}
        />
        <View className="bg-back">
          <Header
          title={"Paneles"}
          />
          <TouchableOpacity>
            <Text className="text-white text-center text-lg font-semibold bg-[#317B9B] p-2">
              Agregar panel
            </Text>
          </TouchableOpacity>
          <FlatList
          className=""
            data={images}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <HomeCardDash
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View className="flex items-center justify-center  sticky p-2">
                  <Text className="text-header text-center justify-center items-center text-xl">
                    Aqui podras encontrar todos los paneles que tienes disponibles
                  </Text>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <>
                 <CustomButton 
                    title="Agregar panel"
                    containerStyles={"bg-[#317B9B]"}
                    textStyles={"text-lg font-semibold text-center mt-2 text-white"}
                    handlePress={() => router.push("/addpanel")}

                  />
                  <Text
                    className={`text-secondary text-center text-2xl my-10 ${
                      true ? "h-screen" : ""
                    }`}
                  >
                    No hay paneles disponibles
                  </Text>
                 
                </>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Panel;
