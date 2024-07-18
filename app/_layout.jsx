import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider"; // Ajusta la ruta según sea necesario
import LoadingScreen from "../src/components/LoadingScreen";


const RootLayout = () => {



  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />

        <>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
            r
          />
          <Stack.Screen
            name="(sett)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(panels)"
            options={{
              headerShown: false,
            }}
            />
        </>
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
