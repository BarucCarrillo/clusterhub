import * as React from React;
import {StyleSheet, View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ForgotPass = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.rectangleView}>
            <Text style={styles.title}>Forgot Password</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rectangleView: {
        borderTopLeftRadius: 60,
    	backgroundColor: "#f5f5f5",
    	flex: 1,
    	width: "100%",
    }
})

export default ForgotPass;