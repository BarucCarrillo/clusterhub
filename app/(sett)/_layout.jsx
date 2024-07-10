import React from 'react';
import { Stack } from 'expo-router';

const settLayout = () =>{
    return(
        <>
            <Stack>
                <Stack.Screen name='(auth)' options={{ headerShown: false }}/>
                <Stack.Screen name='infoConfig' options={{ headerShown: false }}/>                 
            </Stack>
        </>
    )
}

export default settLayout;