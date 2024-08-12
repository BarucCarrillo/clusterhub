import React from "react";
import { Stack } from "expo-router";

export const dashLayout = () => {
    return(
        <>
            <Stack>
                <Stack.Screen name="viewDash"
                getId={({ params }) => params.id}
                options={{headerShown: false}}/>
            </Stack>
        </>
    )
}
