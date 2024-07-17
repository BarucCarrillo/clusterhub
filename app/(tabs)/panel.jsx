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
  const [data, setData] = useState([]);
  const { user } = useGlobalContext();

// let id = user.id;

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardUser(id);
      console.log(response);
      setData(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
    console.log(user);
    console.log(data);
  }, [user]);

  return (
    <>
      <SafeAreaView className="h-full">
        <StatusBar barStyle="light-content" hidden={false} />
        <View className="bg-back">
          <Header title={"Paneles"} />
          <FlatList
            className=""
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <HomeCardDash
                  id={item.id_dashboard}
                  title={item.nombre_dashboard}
                  description={item.user_id}
                  image={item.image}
                />
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View className="flex items-center justify-center  sticky p-2">
                  
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
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Panel;
