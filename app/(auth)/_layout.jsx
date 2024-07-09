import { Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {
  return (
  <>
    <Stack>
      <Stack.Screen
      name='register' options={{ headerShown: false }}
      />
      <Stack.Screen
      name='forgotpass' options={{ headerShown: false }}
      />
      <Stack.Screen
        name='newpassword' options={{ headerShown: false }}
      />
    </Stack>
  </>
  )
}

export default AuthLayout