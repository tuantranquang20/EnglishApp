import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegisterScreen } from "~app/screens";
import { RouteName } from "../constants";

const Stack = createStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={RouteName.LoginScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteName.LoginScreen} component={LoginScreen} />
      <Stack.Screen
        name={RouteName.RegisterScreen}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}
