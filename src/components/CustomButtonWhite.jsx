import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButtonWhite = ({handlePress,title,containerStyles,borderColor,textColor,textStyles}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
        activeOpacity={0.7}
        className={` border-2 border-${borderColor} rounded-xl min-h-[50px] w-[80%] flex self-center justify-center mt-4 ${containerStyles}`}
    >
        <Text className={`text-${textColor} font-semibold text-lg m-auto ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButtonWhite

