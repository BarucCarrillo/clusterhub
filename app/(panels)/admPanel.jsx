import React, {useState, useEffect} from "react";
import {View, Text, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/header";
import AdmCardDash from "../../src/components/AdmCardDash";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getDashboardUser } from "../../lib";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../../src/components/CustomButton";


const admPanel = () => {
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
          <Header title={"Administrar Paneles"} />

          <FlatList
            className=""
            data={data}
            keyExtractor={(item) => item.id_dashboard.toString()}
            renderItem={({ item }) => {
              return (
                <AdmCardDash
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
}

export default admPanel