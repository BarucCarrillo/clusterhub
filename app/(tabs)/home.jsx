import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React from "react";
import HomeCardDash from "../../src/components/HomeCardDash";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, svg } from "../../constants";
const Home = () => {
  return (
    <SafeAreaView className="bg-header">
      <View className="bg-back">
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <HomeCardDash
                title={item.title}
                description={item.description}
                image={item.image}
              />
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View className="bg-header p-3">
                <Text className="text-xl text-center text-secondary">
                  !Bienvenido Antony!
                </Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
