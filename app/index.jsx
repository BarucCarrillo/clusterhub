import * as React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import CustomButton from "../src/components/CustomButton";
import CustomButtonWhite from "../src/components/CustomButtonWhite";
import LoadingScreen from "../src/components/LoadingScreen";

const App = () => {
  const { loginRequest, isLogged, loading, setIsLogged } = useGlobalContext();

  const [form, setForm] = useState({
    correo: "",
    contrasena: "",
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isLogged && isMounted) {
      router.replace("/home");
    }
  }, [isLogged, isMounted]);

  const submit = async () => {
    if (form.correo === "" || form.contrasena === "") {
      Alert.alert("Por favor llene todos los campos");
      return;
    }
    try {
      const response = await loginRequest(form);
      console.log(response);
    } catch (error) {
      console.log(response);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LoadingScreen
      isLoading={loading}
      />
      <View style={styles.rectangleView}>
        <Text style={styles.headerText}>
          Ingreso
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            value={form.correo}
            onChangeText={(e) => setForm({ ...form, correo: e })}
            style={styles.input}
            placeholder="Ingrese su correo"
            keyboardType="email-address"
          />

          <View style={styles.passwordContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              value={form.contrasena}
              onChangeText={(e) => setForm({ ...form, contrasena: e })}
              placeholder="Ingrese su contraseña"
              secureTextEntry={true}
            />
          </View>

          <CustomButton
            title={"Iniciar"}
            containerStyles={"bg-[#317B9B]"}
            borderColor={"secondary"}
            textStyles={"text-lg font-semibold text-center mt-2 text-white"}
            handlePress={submit}
          />

          <TouchableOpacity onPress={() => router.push("/forgotpass")}>
            <Text style={styles.forgotPassword}>
              Olvide mi contraseña
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>ó</Text>
            <View style={styles.divider} />
          </View>

          <CustomButtonWhite
            title={"Registrarme"}
            background={"secondary"}
            borderColor={"secondary"}
            textColor={"secondary"}
            textStyles={"text-lg font-semibold text-center mt-2 text-[#317B9B]"}
            handlePress={() => router.push("/register")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rectangleView: {
    flex: 1,
    borderTopLeftRadius: 60,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    color: '#317B9B',
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    height: 60,
    borderColor: "#317B9B",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "#317b9b",
    textAlign: "left",
    marginBottom: 10,
  },
  forgotPassword: {
    color: "#16557a",
    marginTop: 20,
    textAlign: "left",
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
    backgroundColor: "#317B9B",
  },
  orText: {
    marginHorizontal: 10,
    color: "#16557a",
    fontSize: 15,
  },
});

export default App;
