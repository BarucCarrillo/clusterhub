import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/views/login';
import Register from './src/views/register';
import ForgotPass from './src/views/forgotpass';


const Stack = createStackNavigator();

export default function App({}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPass" component={ForgotPass}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


