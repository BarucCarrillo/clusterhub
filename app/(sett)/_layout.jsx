import React from 'react';
import { Stack } from 'expo-router';

const settLayout = () =>{
    return(
        <>
            <Stack>
                <Stack.Screen name='infoConfig' options={{ headerShown: false }}/>                 
                <Stack.Screen name='adminSensor' options={{headerShown: false}}/>
            </Stack>
        </>
    )
}

export default settLayout;