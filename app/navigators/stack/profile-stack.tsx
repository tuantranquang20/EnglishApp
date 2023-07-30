import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { RouteName } from "../constants"
import { ProfileScreen, SettingScreen } from "~app/screens"

const Stack = createStackNavigator()

export function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName={RouteName.ProfileScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteName.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen name={RouteName.SettingScreen} component={SettingScreen} />
    </Stack.Navigator>
  )
}
