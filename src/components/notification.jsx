import React, { useEffect, useRef, useState } from 'react';
import { Button, View, Platform, FlatList, Text, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    };

    loadNotifications();

    // Listener para notificaciones recibidas mientras la aplicación está en primer plano
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      storeNotification(notification);
    });

    // Listener para respuestas a notificaciones (cuando el usuario interactúa con ellas)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      storeNotification(response.notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const storeNotification = async (notification) => {
    const timestamp = new Date().toISOString(); // Obtiene la fecha y hora actuales en formato ISO
    const notificationWithTimestamp = { ...notification, timestamp };
    const newNotifications = [notificationWithTimestamp, ...notifications];
    setNotifications(newNotifications);
    await AsyncStorage.setItem('notifications', JSON.stringify(newNotifications));
  };

  const deleteNotification = async (index) => {
    const newNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(newNotifications);
    await AsyncStorage.setItem('notifications', JSON.stringify(newNotifications));
  };

  return (
    <View>
      <Button
            title="Presiona para programar una notificación"
            onPress={async () => {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "¡Tienes un nuevo mensaje! 📬",
                  body: 'Este es el cuerpo de la notificación',
                },
                trigger: { seconds: 2 },
              });
            }}
          />
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: '#ccc', backgroundColor: "#FFF", marginTop: 15, }}>
            <View>
              <Text style={{fontSize: 18, fontFamily: 'Roboto', fontWeight:'bold'}}>{item.request.content.title}</Text>
              <Text style={{fontSize: 16, fontFamily: 'Roboto', marginTop: 5}}>{item.request.content.body}</Text>
              <Text style={{fontSize: 12, fontFamily: 'Roboto', marginTop: 5}}>{new Date(item.timestamp).toLocaleString()}</Text> 
            </View>
            <View>
              <TouchableOpacity onPress={() => deleteNotification(index)} style={{ padding: 10 }}>
                <Text style={{ color: 'red' }}>Eliminar</Text>
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

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('¡No se obtuvo el permiso para notificaciones push!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Debes usar un dispositivo físico para las notificaciones push');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
