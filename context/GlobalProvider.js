import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { login } from "../lib";
import { router } from "expo-router";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log('User state updated:', user);
  }, [user]); // Este efecto se ejecutará cada vez que `user` cambie

  const loginRequest = async (data) => {
    try {
      const response = await login(data); // Obtén la respuesta de la función login

      // Aquí response es un objeto JSON, no un objeto de respuesta de fetch
      if (response.token) {
        // Verifica si el token está presente en la respuesta
        await AsyncStorage.setItem("token", response.token);
        Alert.alert("Login successful", `Welcome ${response.nombre}`);
        setIsLogged(true);
        setUser({
          id: response.id,
          nombre: response.nombre,
          apellidos: response.apellidos,
          correo: response.correo,
        });
        console.log(user + "user");
      } else {
        Alert.alert("Login failed", response.error || "Unknown error");
      }

    } catch (error) {
      console.error("Login error", error);
      Alert.alert("Login error", error.message || "Unknown error");
    }
  };


  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      setUser(null);
      router.replace("/");
    } catch (error) {
      console.error("Logout error", error);
      Alert.alert("Logout error", error.message || "Unknown error");
    }
  }


  

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setIsLogged(true);
          setLoading(false);
        } else {
          setIsLogged(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Check login error", error);
        Alert.alert("Check login error", error.message || "Unknown error");
      }finally{
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLogged, setIsLogged, user, setUser, loading, loginRequest ,logout}}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
