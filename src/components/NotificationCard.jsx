import { View, Text } from "react-native";
import React from "react";
import Notification from "./notification";

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
