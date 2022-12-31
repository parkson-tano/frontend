import { View, Text } from 'react-native'
import React from 'react'
import Register from "../Register";
import Login from "../auth/Login";
import MomoRegister from "../MomoRegister";
import AgentRegister from "../AgentRegister";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const RegisterStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MomoRegister" component={MomoRegister} />
      <Stack.Screen name="AgentRegister" component={AgentRegister} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default RegisterStack