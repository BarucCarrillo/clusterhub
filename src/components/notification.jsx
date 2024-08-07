import React, { useEffect, useRef, useState } from "react";
import { Button, View, FlatList, Text, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNotifications, deleteNotificationById } from "../../lib";

// Configuración del controlador de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

    // Recuperar notificaciones almacenadas al iniciar la aplicación
    const loadNotifications = async () => {
      const storedNotifications = await AsyncStorage.getItem("notifications");
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    };

    loadNotifications();

    // Listener para notificaciones recibidas mientras la aplicación está en primer plano
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        storeNotification(notification);
      });

    // Listener para respuestas a notificaciones (cuando el usuario interactúa con ellas)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        storeNotification(response.notification);
      });

    // Cargar notificaciones desde el backend
    const fetchNotifications = async () => {
      try {
        const result = await getNotifications(9); // Reemplaza el 9 con el ID de usuario correcto
        setNotifications(result);
        await AsyncStorage.setItem("notifications", JSON.stringify(result));
      } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
      }
    };

    fetchNotifications();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const storeNotification = async (notification) => {
    const timestamp = new Date().toISOString(); // Obtiene la fecha y hora actuales en formato ISO
    const notificationWithTimestamp = { ...notification, timestamp };
    const newNotifications = [notificationWithTimestamp, ...notifications];
    setNotifications(newNotifications);
    await AsyncStorage.setItem(
      "notifications",
      JSON.stringify(newNotifications)
    );
  };

  const deleteNotification = async (id, index) => {
    try {
      await deleteNotificationById(id);
      const newNotifications = notifications.filter((_, i) => i !== index);
      setNotifications(newNotifications);
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify(newNotifications)
      );
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
    }
  };

  

  return (
    <View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id_notificacion.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              padding: 10,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "#ccc",
              backgroundColor: "#FFF",
              marginTop: 15,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                }}
              >
                Notificación ID: {item.id_notificacion}
              </Text>
              <Text
                style={{ fontSize: 16, fontFamily: "Roboto", marginTop: 5 }}
              >
                {item.mensaje}
              </Text>
              <Text
                style={{ fontSize: 12, fontFamily: "Roboto", marginTop: 5 }}
              >
                {new Date(item.fecha).toLocaleString()}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => deleteNotification(item.id_notificacion,index)}
                style={{ padding: 10 }}
              >
                <Text style={{ color: "red" }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("¡No se obtuvo el permiso para notificaciones push!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Debes usar un dispositivo físico para las notificaciones push");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
