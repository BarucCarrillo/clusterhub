import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";

const Login = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.rectangleView}>
      <Header />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo"
          keyboardType="email-address"
        />

        <View style={styles.passwordContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su contraseña"
            secureTextEntry={true}
          />
        </View>
          <Button title="Iniciar" buttonStyle={styles.loginButton}
          
          onPress={()=> navigation.navigate("Home")}
          />
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
          <Text style={styles.forgotPassword}>Olvide mi contraseña</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>ó</Text>
          <View style={styles.divider} />
        </View>

        <Button
          title="Registrar"
          type="outline"
          buttonStyle={styles.registerButton}
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleView: {
    borderTopLeftRadius: 60,
    backgroundColor: "#f5f5f5",
    flex: 1,
    width: "100%",
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
    marginBottom: 20,
    width: "90%",
    display: "flex",
    alignSelf: "center",
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
    width: "60%",
    height: 50,
    marginTop: 20,
    marginLeft: 25,
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
    marginVertical: 20,
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

export default Login;
