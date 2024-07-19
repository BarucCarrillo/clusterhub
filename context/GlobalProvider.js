import { createContext, useContext, useState, useEffect } from "react";
import { BACKEND_API } from "@env"; // Asegúrate de que esta línea esté presente en tu archivo

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

  const loginRequest = async (data) => {
    try {
      const response = await login(data); // Obtén la respuesta de la función login

      // Aquí response es un objeto JSON, no un objeto de respuesta de fetch
      if (response.token) {
        // Verifica si el token está presente en la respuesta
        await AsyncStorage.setItem("token", response.token);
        Alert.alert("Login successful", `Welcome ${response.nombre}`);
        setIsLogged(true);
        const userData = {
          id: response.id,
          nombre: response.nombre,
          apellidos: response.apellidos,
          correo: response.correo,
        };
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        Alert.alert("Login successful", `Welcome ${response.nombre}`);
        setIsLogged(true);
        setUser(userData);
        console.log("User after login:", userData);
      } else {
        Alert.alert("Login failed", response.error || "Unknown error");
      }
    } catch (error) {
      console.error("Login error", error);
      Alert.alert("Login error", error.message || "Unknown error");
    }
  };

  const updateInfoUser = async (data) => {
    try {
      const token = await AsyncStorage.getItem("token"); // Obtener el token almacenado
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await fetch(`${BACKEND_API}/users/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Update failed");
      }

      const result = await response.json();

      // Asumir que la actualización fue exitosa si llegamos a este punto
      // Actualizar la información del usuario en AsyncStorage con los datos que enviaste
      const updatedUserData = {
        id: data.id,
        nombre: data.nombre,
        apellidos: data.apellidos,
        correo: data.correo,
      };
      await AsyncStorage.setItem("user", JSON.stringify(updatedUserData));

      Alert.alert("Update successful", "User information updated successfully");

      setUser(updatedUserData);
      console.log("User after update:", updatedUserData);

      return result;
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Update error", error.message || "Unknown error");
      throw error;
    }
  };

  const userChangePassword = async (data) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }
      const response = await fetch(
        `${BACKEND_API}/userChangePassword/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Update failed");
      }
      const result = await response.json();
      Alert.alert("Update successful", "User information updated successfully");
      return result;
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Update error", error.message || "Unknown error");
      throw error;
    }
  };

  const insertWidgetsInDashboard = async (id,data) => {
    try {
      const token = await AsyncStorage.getItem("token"); // Obtener el token almacenado
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await fetch(`${BACKEND_API}/dashboard_graficas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          graficas_id: data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Dashboard creation failed");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }

  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      setIsLogged(false);
      setUser(null);
      router.replace("/");
    } catch (error) {
      console.error("Logout error", error);
      Alert.alert("Logout error", error.message || "Unknown error");
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const userData = await AsyncStorage.getItem("user");
          if (userData) {
            setUser(JSON.parse(userData));
          }
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        console.error("Check login error", error);
        Alert.alert("Check login error", error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        loginRequest,
        logout,
        updateInfoUser,
        userChangePassword,
        insertWidgetsInDashboard,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
