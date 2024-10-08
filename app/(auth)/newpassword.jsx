import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Header from "../../src/components/header";
import { Button } from "react-native-elements";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Alert } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const newPassword = () => {
  const [form, setForm] = useState({
    password: "",
    new_password: "",
    confirm_password: "",
  });

  const { userChangePassword } = useGlobalContext();
  const submit = () => {
    if (form.new_password !== form.confirm_password) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }

    if (
      form.password === "" ||
      form.new_password === "" ||
      form.confirm_password === ""
    ) {
      Alert.alert("Por favor llene todos los campos");
      return;
    }

    try {
      const response = userChangePassword(form);
      router.push("/home");
    } catch (error) {
      console.log(error + "error");
    }
  };

  return (
    <SafeAreaView> 
    <View style={styles.rectangleView}>
      <Header title={'Nueva Contraseña'}/>
      <View className="mt-10">
        <Text style={styles.label}>Contraseña actual</Text>
      </View>
      <TextInput
        secureTextEntry={true}
        value={form.password}
        onChangeText={(e) => setForm({ ...form, password: e })}
        style={styles.input}
      />

      <View style={styles.passContainer}>
        <Text style={styles.label}>Nueva Contraseña</Text>

        <TextInput
          value={form.new_password}
          secureTextEntry={true}
          onChangeText={(e) => setForm({ ...form, new_password: e })}
          style={styles.input}
        />

        <Text style={styles.label}>Confirma tu contraseña</Text>

        <TextInput
          secureTextEntry={true}
          value={form.confirm_password}
          onChangeText={(e) => setForm({ ...form, confirm_password: e })}
          style={styles.input}
        />
      </View>

      <Button
        title={"Cambiar"}
        buttonStyle={styles.verButton}
        onPress={submit}
      />
    </View>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 28,
    fontFamily: "Roboto",
    color: "#317b9b",
    textAlign: "left",
    marginBottom: 20,
    marginLeft: 30,
    marginTop: 20,
  },
  input: {
    height: 60,
    width: "80%",
    borderColor: "#317b9b",
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 10,
    display: "flex",
    alignSelf: "center",
  },
  verButton: {
    backgroundColor: "#16557a",
    borderRadius: 10,
    height: 50,
    width: "80%",
    height: 50,
    marginTop: 30,
    display: "flex",
    alignSelf: "center",
  },
});

export default newPassword;
