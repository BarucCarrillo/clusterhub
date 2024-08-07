import { View, } from "react-native";
import React from "react";
import Notification from "./notification";

//LLAMA A LA NOTIFICACIÓN Y LA MUESTRA EN UNA VISTA

const NotificationCard = () => {
  return (
    <View style={{width: "90%",}}>
      <View>
        <Notification/>
      </View>
    </View>
  );
};

export default NotificationCard;
