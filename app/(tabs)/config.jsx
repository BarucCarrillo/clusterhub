import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'

const Config = () => {
  const {logout} = useGlobalContext()
  return (
   <SafeAreaView>

   <View>
      <Text style={styles.tittle}>Configuración</Text>
      <Image style={styles.img} source={{uri:'https://th.bing.com/th/id/OIP.NnQzuZFcKjxCImErUgu_fwHaE7?rs=1&pid=ImgDetMain',}}></Image>

      <View style={styles.btnContainer}>
        <Button title="Información Personal"
                buttonStyle={styles.btnConfig}
                titleStyle={{color:"#317b9b", fontSize: 28}}
                onPress={() => router.push('/infoConfig')}/>
        <Button title="Cambiar Contraseña"
                buttonStyle={styles.btnConfig}
                titleStyle={{color:"#317b9b", fontSize: 28}}
                onPress={()=> router.push('/newpassword')}/>
        <Button title="Cerrar Sesión"
                buttonStyle={styles.btnConfig}
                titleStyle={{color:"#317b9b", fontSize: 28}}
                onPress={logout}
                />
      </View>
    </View>
 </SafeAreaView>

  )
}

const styles = StyleSheet.create({
    tittle: {
      fontSize: 32,
      fontWeight: "700",
      fontFamily: "Roboto",
      color: "#317b9b",
      textAlign: 'center',
      marginTop: 50,
    },
    btnContainer: {
      marginTop: 10,
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
    },
    img: {
      width: "48%",
      height: "35%",
      marginTop: 35,
      display: 'flex',
      alignSelf: 'center',
      borderRadius: 120,
  }
})

export default Config