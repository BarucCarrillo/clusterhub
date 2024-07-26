import {
  View,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationCard from "../../src/components/NotificationCard";
import Header from "../../src/components/header";
const Alert = () => {
  //DELVELVE A LA PANTALLA LAS NOTIFCACIONES RECIBIDAS
  return (
    <>
      <SafeAreaView
        className={`flex-1 bg-back`}
      >
        <Header title={"Notificaciones"} />

        <View
          className={`flex  items-center justify-center p-2 ${
            Platform.OS === "ios" ? "" : "mb-10"} `}
        >
          <NotificationCard/>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Alert;
