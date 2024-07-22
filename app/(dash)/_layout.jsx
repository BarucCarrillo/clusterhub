import React from "react";
import { Stack } from "expo-router";

const dashLayout = () => {
    return(
        <>
            <Stack>
                <Stack.Screen name="viewDash" options={{headerShown: false}}/>
            </Stack>
        </>
    )
}
