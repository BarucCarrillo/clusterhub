import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import HomeCardDash from "../../src/components/HomeCardDash";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, svg } from "../../constants";
import CustomButton from "../../src/components/CustomButton";
import NotificationCard from "../../src/components/NotificationCard";
import Header from "../../src/components/header";
const Alert = () => {
  return (
    <>
      <SafeAreaView
        className={`flex-1 bg-back
      `}
      >
        <Header title={"Notificaciones"} />

        <View
          className={`flex  items-center justify-center p-2 ${
            Platform.OS === "ios" ? "" : "mb-10"
          } `}
        >
          <FlatList
            className=" bg-white rounded-xl pb-2 px-4 shadow-xl  w-full"
            data={images.slice(0, 11)} // Render only the first 6 items
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View className="bg-back shadow rounded-lg p-2 mb-4 m-2 ">
                  <NotificationCard />
                </View>
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View className="flex items-center justify-center  sticky ">
                  <Text className="text-header text-center justify-center items-center text-xl"></Text>
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

export default Alert;
