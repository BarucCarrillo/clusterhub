import React from "react";
import { Stack } from "expo-router";

const panelLayout = () => {
    return(
        <>
            <Stack>
                <Stack.Screen name='newPanel' options={{headerShown: false}}/>
                <Stack.Screen name="admPanel" options={{headerShown: false}}/>
                <Stack.Screen name="editPanel" options={{headerShown: false}}/>
            </Stack>
        </>
    )
}

export default panelLayout;