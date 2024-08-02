import {
  View,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import HomeCardDash from "../../src/components/HomeCardDash";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../src/components/CustomButton";
import Header from "../../src/components/header";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getDashboardUser } from "../../lib";
import { router } from "expo-router";

const Panel = () => {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // Estado para refrescar
  const { user } = useGlobalContext();
  let id = user.id;

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardUser(id);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboard(); // Refresca los datos
    setRefreshing(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, [id]);

  return (
    <>
      <SafeAreaView className="h-full">
        <StatusBar barStyle="light-content" hidden={false} />
        <Header title={"Paneles"} />
        <>
          <CustomButton
            title="Agregar panel"
            containerStyles={"bg-[#317B9B]"}
            textStyles={"text-lg font-semibold text-center mt-2 text-white"}
            handlePress={() => router.push("/newPanel")}
          />
          <CustomButton
            title="Administrar panel"
            containerStyles={"bg-[#317B9B]"}
            textStyles={"text-lg font-semibold text-center mt-2 text-white"}
            handlePress={() => router.push("/admPanel")}
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
                handlePress2={() => {
                  router.push({
                    pathname: "/viewDash",
                    params: { id: item.id_dashboard },
                  })
                }}
              />
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View className="flex items-center justify-center sticky p-2"></View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <>
                <Text>No tienes paneles creados</Text>
              </>
            );
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh} // Añadir esta propiedad para refrescar
        />
      </SafeAreaView>
    </>
  );
};

export default Panel;
