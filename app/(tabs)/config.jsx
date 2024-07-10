import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import React from 'react'
import { router } from 'expo-router'

const Config = () => {
  return (
    <View>
      <Text style={styles.tittle}>Configuración</Text>
      <View style={styles.btnContainer}>
        <Button title="Información Personal"
                buttonStyle={styles.btnConfig}
                titleStyle={{color:"#317b9b", fontSize: 28}}/>
        <Button title="Cambiar Contraseña"
                buttonStyle={styles.btnConfig}
                titleStyle={{color:"#317b9b", fontSize: 28}}/>
        <Button title="Cerrar Sesión"
                buttonStyle={styles.btnConfig}
                titleStyle={{color:"#317b9b", fontSize: 28}}
                onPress={()=> router.push('/')}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    tittle: {
      fontSize: 32,
      fontWeight: "700",
      fontFamily: "Roboto",
      color: "#317b9b",
      textAlign: 'center',
      marginTop: 30
    },
    btnContainer: {
      marginTop: 100,
    },
    btnConfig: {
      borderRadius: 8,
      backgroundColor: "#fff",
      width: "80%",
      height: 'auto',
      marginTop: 35,
      display: 'flex',
      alignSelf: 'center',
      color: "#317b9b",
    }
})

export default Config