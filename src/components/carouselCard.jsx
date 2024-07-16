import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CarouselCard = () => {
    return(
        <View style={styles.containerCard}>
            <Text>HOLA</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    containerCard: {
        flex: 1,
        display: 'flex',
        backgroundColor: "#fff",
        width: "80%",
        
    }
})

export default CarouselCard;
