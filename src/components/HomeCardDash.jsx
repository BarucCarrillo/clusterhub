import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomButton from "../../src/components/CustomButton";
import { router } from "expo-router";

const HomeCardDash = ({ title, description, image,handlePress2 }) => {
  return (
    <View className=" pl-4 pr-4 overflow-hidden  mb-5">
      <View className="bg-white rounded-lg  p-4 h-[180px] w-full shadow-lg ">
        <Text className="text-secondary font-semibold text-2xl ml-2">{title}</Text>
        <View className="flex flex-row justify-between items-center ">
          <Text className="text-md text-[#868686] flex-shrink">{description}</Text>
          <Image className="w-[50px] h-[50px] " source={image}
          resizeMode='contain'
          />
        </View>
        <CustomButton
                    title="Visuailzar Dashboard"
                    containerStyles={"bg-[#317B9B]"}
                    textStyles={
                      "text-lg font-semibold text-center mt-2 text-white"
                    }
                    handlePress={handlePress2}
                  />
      </View>
    </View>
  );
};

export default HomeCardDash;