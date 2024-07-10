import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
const HomeCardDash = ({ title, description, image }) => {
  return (
    <View className="pl-4 pr-4">
      <View className="bg-white rounded-lg mt-5 p-2 h-[120px] w-[100%] shadow-md ">
        <Text className="text-secondary text-2xl ml-2">{title}</Text>
        <View className="  flex flex-row w-[90%]  ">
          <View className="p-2">
            <Text className="text-md text-[#868686] ">{description}</Text>
          </View>
          <View>
            <Image className="w-[50px] h-[50px]  " source={image} />
          </View>
        </View>
        <Text></Text>
      </View>
    </View>
  );
};

export default HomeCardDash;
