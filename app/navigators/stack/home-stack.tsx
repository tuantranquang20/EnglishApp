import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ExerciseScreen,
  GrammarScreen,
  HomeScreen,
  ListeningScreen,
  ReadingScreen,
  SpeakingScreen,
} from "~app/screens";
import { RouteName } from "../constants";
import { Lesson as LessonGrammarScreen } from "~app/screens/grammar/lesson";
import { Lesson as LessonListingScreen } from "~app/screens/listening/lesson";
import { Lesson as LessonReadingScreen } from "~app/screens/reading/lesson";
import { Lesson as LessonSpeakingScreen } from "~app/screens/speaking/lesson";

const Stack = createStackNavigator();

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
      <Stack.Screen
        name={RouteName.ListeningScreen}
        component={ListeningScreen}
      />
      <Stack.Screen
        name={RouteName.SpeakingScreen}
        component={SpeakingScreen}
      />
      <Stack.Screen name={RouteName.GrammarScreen} component={GrammarScreen} />
      <Stack.Screen
        name={RouteName.LessonGrammarScreen}
        component={LessonGrammarScreen}
      />
      <Stack.Screen
        name={RouteName.LessonListingScreen}
        component={LessonListingScreen}
      />
      <Stack.Screen
        name={RouteName.LessonReadingScreen}
        component={LessonReadingScreen}
      />
      <Stack.Screen
        name={RouteName.LessonSpeakingScreen}
        component={LessonSpeakingScreen}
      />
      <Stack.Screen
        name={RouteName.ExerciseScreen}
        component={ExerciseScreen}
      />
    </Stack.Navigator>
  );
}
