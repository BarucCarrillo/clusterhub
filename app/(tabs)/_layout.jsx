import { View, Text , Image} from "react-native";
import { Tabs } from "expo-router";
import React from "react";
import {icons} from "../../constants";

const TabIcon = ({icon,color,name,focused}) => {
  return <View className="items-center justify-center gap-2 mt-3">
<Image
source={icon}
resizeMode="contain"
tintColor={color}
className="w-6 h-6"
/>

<Text className={`${focused ? "font-semibold" : "font-normal"}text-xs`}
style={{color: color}}
>
{name}
</Text>

  </View>;
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{

          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#27627B",
          tabBarActiveTintColor: "#317B9B",
          tabBarStyle: {
            backgroundColor: "#95D7CA",
            borderTopWidth: 1,
            borderTopColor: "#95D7CA",
            height: 85,
            marginTop: 15,
          },
        }}
      >

        <Tabs.Screen
          name="panel"
          options={{
            title: "Panel",
            headerShown: false,
            
            tabBarIcon: ({ color, focused }) => (
             <TabIcon
             icon={icons.panel}
              color={color}
              name="Paneles"
              focused={focused}
             />
            ),
          }}
        />

<Tabs.Screen
          name="alerts"
          options={{
            title: "Alerts",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
             <TabIcon
             icon={icons.alert}
              color={color}
              name="Notificaciones"
              focused={focused}
             />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
              icon={icons.home}
               color={color}
               name="Inicio"
               focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="config"
          options={{
            title: "Config",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
             icon={icons.config}
              color={color}
              name="Configuración"
              focused={focused}
             />
            ),
          }}
        />

      </Tabs>
    </>
  );
};

export default TabsLayout;
