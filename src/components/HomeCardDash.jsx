import React from 'react';
import { View, Text, Image } from 'react-native';

const HomeCardDash = ({ title, description, image, id }) => {
  return (
    <View className=" pl-4 pr-4 overflow-hidden  mb-5">
      <View className="bg-white rounded-lg  p-4 h-[120px] w-full shadow-lg ">
        <Text className="text-secondary font-semibold text-2xl ml-2">{title}, {id}</Text>
        <View className="flex flex-row justify-between items-center ">
          <Text className="text-md text-[#868686] flex-shrink">{description}</Text>
          <Image className="w-[50px] h-[50px] " source={image}
          resizeMode='contain'
          />
        </View>
      </View>
    </View>
  );
};

export default HomeCardDash;