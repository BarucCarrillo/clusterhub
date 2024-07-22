import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import HomeCardDash from "../../src/components/HomeCardDash";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, svg } from "../../constants";
import CustomButton from "../../src/components/CustomButton";
import Header from "../../src/components/header";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getDashboardUser } from "../../lib";
import { router } from "expo-router";
const Panel = () => {
  const [data, setData] = useState(null);
  const { user } = useGlobalContext();
  // console.log(user.id)

  let id = user.id;
 
  const fetchDashboard = async () => {
    try {
      const response = await getDashboardUser(id);
      // console.log(response + " response");
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <SafeAreaView className="h-full">
        <StatusBar barStyle="light-content" hidden={false} />
        <View className="bg-back">
          <Header title={"Paneles"} />
          <>
                  <CustomButton
                    title="Agregar panel"
                    containerStyles={"bg-[#317B9B]"}
                    textStyles={
                      "text-lg font-semibold text-center mt-2 text-white"
                    }
                    handlePress={() => router.push("/newPanel")}
                  />
                  <CustomButton
                    title="Administrar panel"
                    containerStyles={"bg-[#317B9B]"}
                    textStyles={
                      "text-lg font-semibold text-center mt-2 text-white"
                    }
                    handlePress={() => router.push("/addpanel")}
                  />
                </>
          <FlatList
            className=""
            data={data}
            keyExtractor={(item) => item.id_dashboard.toString()}
            renderItem={({ item }) => {
              return (
                <HomeCardDash
                  title={item.nombre_dashboard}
                  description={item.descripcion}
                  image={item.image}
                />
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View className="flex items-center justify-center  sticky p-2"></View>
              );
            }}
            ListEmptyComponent={() => {
              return (
              <>
              <Text>
                No tienes paneles creados
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
