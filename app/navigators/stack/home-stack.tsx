import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  GrammarScreen,
  HomeScreen,
  ListeningScreen,
  ReadingScreen,
  SpeakingScreen,
} from "~app/screens"
import { RouteName } from "../constants"

const Stack = createStackNavigator()

export function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName={RouteName.HomeScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteName.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={RouteName.ReadingScreen} component={ReadingScreen} />
      <Stack.Screen name={RouteName.ListeningScreen} component={ListeningScreen} />
      <Stack.Screen name={RouteName.SpeakingScreen} component={SpeakingScreen} />
      <Stack.Screen name={RouteName.GrammarScreen} component={GrammarScreen} />
    </Stack.Navigator>
  )
}
