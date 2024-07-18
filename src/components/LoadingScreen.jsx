import { View, ActivityIndicator, Dimensions, Platform, StyleSheet } from 'react-native';
import React from 'react';
import { useGlobalContext } from '../../context/GlobalProvider';

const LoadingScreen = () => {
  const { loading } = useGlobalContext();
  const osName = Platform.OS;
  const screenHeight = Dimensions.get('screen').height;

  if (!loading) return null;

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      <ActivityIndicator
        animating={loading}
        
        color="#fff"
        size={osName === 'ios' ? 'large' : 50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Ajuste para la opacidad del fondo
    zIndex: 10,
  },
});

export default LoadingScreen;
