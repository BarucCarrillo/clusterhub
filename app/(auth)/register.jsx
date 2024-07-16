import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { router } from "expo-router";
import Header from "../../src/components/header";
import { register } from "../../lib";
const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    contrasena: "",
  });

  const submit = async () => {
    if (
      form.nombre === "" ||
      form.apellidos === "" ||
      form.correo === "" ||
      form.contrasena === ""
    ) {
      Alert.alert("Por favor llene todos los campos");
      return;
    }
    try {
      const response = await register(form);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.rectangleView}>
      <Header />
      <View style={styles.formContainer}>
        <Text style={styles.labelTitle}>Registra tus datos</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
         style={styles.input}
         placeholder="Ingrese su nombre" 
         value={form.nombre}
            onChangeText={(e) => setForm({ ...form, nombre: e })}

         />

        <Text style={styles.label}>Apellidos</Text>
        <TextInput 
        style={styles.input} 
        placeholder="Ingrese su apellidos" 
        value={form.apellidos}
            onChangeText={(e) => setForm({ ...form, apellidos:e})}
        
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo"
          keyboardType="email-address"
            value={form.correo}
            onChangeText={(e) => setForm({ ...form, correo: e })}

        />

        <View style={styles.passwordContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su contraseña"
            secureTextEntry={true}
            value={form.contrasena}
            onChangeText={(e) => setForm({ ...form, contrasena: e })}

          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Registrar"
           buttonStyle={styles.registerButton} 
           onPress={submit}
           />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>ó</Text>
            <View style={styles.divider} />
          </View>

          <Button
            title="Iniciar Sesión"
            buttonStyle={styles.loginButton}
            onPress={() => router.push("/")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rectangleView: {
    borderTopLeftRadius: 60,
    backgroundColor: "#f5f5f5",
    flex: 1,
    width: "100%",
    height: 900,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "90%",
    display: "flex",
    alignSelf: "center",
  },
  labelTitle: {
    fontSize: 28,
    fontFamily: "Roboto",
    color: "#317b9b",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 15,
    fontWeight: "bold",
  },
  label: {
    fontSize: 28,
    fontFamily: "Roboto",
    color: "#317b9b",
    textAlign: "left",
    marginLeft: 25,
    marginTop: 15,
    marginRight: 60,
    marginBottom: 20,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#16557a",
    borderRadius: 10,
    height: 50,
    width: "80%",
    display: "flex",
    alignSelf: "center",
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: "#16557a",
    borderRadius: 10,
    height: 50,
  },
  buttonContainer: {
    marginTop: 15,
  },
  forgotPassword: {
    color: "#16557a",
    marginTop: 20,
    textAlign: "left",
    marginLeft: 25,
    fontSize: 15,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    display: "flex",
    alignSelf: "center",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#16557a",
    fontSize: 15,
  },
  registerButton: {
    borderColor: "#16557a",
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    width: "80%",
    display: "flex",
    alignSelf: "center",
  },
});

export default Register;
