import React, { useState } from "react";
import {View, Text, StyleSheet, ScrollView, Modal} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/header";
import GridCharts from "../../src/components/gridCharts";
import { Icon } from "react-native-elements";

const viewDash = () => {

    const [shareVisible, setShareVisible] = useState(false);

    return(
        <SafeAreaView>
            <ScrollView>
                <Header title={'NOMBRE DASHBOARD'}/>
                    <View style={styles.chartsContainer}>
                        <GridCharts/>
                        <Icon
                            raised
                            name="share"
                            type="font-awesome"
                            color="#317B9B"
                            marginTop="5"
                            onPress={() => setShareVisible(true)}
                        />
                    </View>
                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={shareVisible}
                    onRequestClose={() => setShareVisible(false)}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Comparte tu Dashboard</Text>
                                <View style={styles.modalIcon}>
                                    <Icon
                                    name="facebook"
                                    size={48}
                                    color="#317B9B"
                                    style={styles.icon}
                                    //onPress={() => setShareVisible(false)}
                                    />
                                    <View style={{width: 50}}></View>
                                    <Icon
                                    name="message"
                                    size={48}
                                    color="#317B9B"
                                    style={styles.icon}
                                    //onPress={() => setShareVisible(false)}
                                    />
                                </View>
                            </View>
                        </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    chartsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      width: 350,
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 20,
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
    modalIcon:{
        flexDirection: 'row',
        marginHorizontal: 10,
    }
})

export default viewDash