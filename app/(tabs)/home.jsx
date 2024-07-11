import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import HomeCardDash from "../../src/components/HomeCardDash";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, svg } from "../../constants";
import CustomButton from "../../src/components/CustomButton";
import Header from "../../src/components/header";
const Home = () => {
  return (
    <>
      <SafeAreaView
        className={`flex-1
      `}
      >
        <StatusBar barStyle="light-content" hidden={false} />
        <View className="bg-back">
          <Header title={"Inicio"} />
          <FlatList
            className=""
            data={images.slice(0, 6)} // Render only the first 6 items
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <>
                  <HomeCardDash
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                  />
                </>
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View className="flex items-center justify-center my-5 sticky p-2">
                  <Text className="text-header text-center justify-center items-center text-xl">
                    Estos son los paneles que tienes marcados como favoritos ✨
                  </Text>

                  <CustomButton
                    title={"Ver todos los paneles"}
                    containerStyles={"bg-[#317B9B]"}
                    borderColor={"secondary"}
                    textStyles={
                      "text-lg font-semibold text-center mt-2 text-white"
                    }
                    handlePress={() => router.push("/home")}
                  />
                  <Text className="text-sm text-center my-2 text-secondary   ">
                    Aqui podras encontrar todos los paneles que tienes
                    disponibles 👆
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
                    textStyles={
                      "text-lg font-semibold text-center mt-2 text-white"
                    }
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
          <></>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
