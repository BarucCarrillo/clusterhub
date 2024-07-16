import React from "react";
import { Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider"; // Ajusta la ruta según sea necesario
import { useGlobalContext } from "../context/GlobalProvider"; // Ajusta la ruta según sea necesario
import LoadingScreen from "../src/components/LoadingScreen"; // Ajusta la ruta según sea necesario

const RootLayout = () => {
  const { isLogged, loading,cargando } = useGlobalContext();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      {!isLogged ? (
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(sett)"
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack>
  );
};

const AppLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <RootLayout />
    </GlobalProvider>
  );
};

export default AppLayout;