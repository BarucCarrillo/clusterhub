import { View, Text } from "react-native";
import React from "react";

const NotificationCard = () => {
  return (
    <View className="flex flex-col ">
      <View>
        <Text className="text-secondary font-semibold">Flores - Casa</Text>
        <Text className="text-[#868686]">
          Se detecto temperaturas bajas, por favor encender las lamparas uv o
          sistema de calefacción.
        </Text>
      </View>
      
      <Text className="text-[10px] ml-auto text-[#868686]">Fecha : 24-06-24</Text>
    </View>
  );
};

export default NotificationCard;
