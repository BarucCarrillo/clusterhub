import { View, Text , Image} from "react-native";
import { Tabs } from "expo-router";
import React from "react";
import {icons} from "../../constants";

const TabIcon = ({icon,color,name,focused}) => {
  return <View className="items-center justify-center gap-2">
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
          tabBarActiveTintColor: "#000",
          tabBarActiveTintColor: "#000",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#000",
            height: 84,
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
              name="Panel"
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
              <View>
                <Text>Alert</Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Text>Home</Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="config"
          options={{
            title: "Config",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Text>Gear</Text>
              </View>
            ),
          }}
        />

      </Tabs>
    </>
  );
};

export default TabsLayout;
