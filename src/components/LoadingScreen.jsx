import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';

const LoadingScreen = () => {
  const { loading } = useGlobalContext();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation;
    if (loading) {
      const spin = () => {
        spinValue.setValue(0);
        animation = Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => spin());
      };

      spin();
    } else if (animation) {
      animation.stop();
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [loading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Animated.Image
          source={icons.logo}
          style={[styles.image, loading && { transform: [{ rotate: spin }] }]}
          resizeMode="contain"
        />
        <Text className="text-2xl text-secondary text-center font-semibold mt-5">
          Cargando, por favor sea paciente
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200, // Ajusta el tamaño según sea necesario
    height: 200, // Ajusta el tamaño según sea necesario
  },
});

export default LoadingScreen;