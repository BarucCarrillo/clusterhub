import { View, Text, Image } from "react-native";
import React from "react";
import { svg } from "../../constants";

const Header = ({ title }) => {
  return (
    <>
      <View className="flex sticky ">
        <Text className="text-2xl font-bold text-center justify-center text-secondary " style={{marginTop: 15, fontSize: 32,}}>
          {title}
        </Text>
      </View>
    </>
  );
};

export default Header;
